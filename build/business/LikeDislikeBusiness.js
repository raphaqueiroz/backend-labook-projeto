"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikiDislikeBusiness = void 0;
const LikeDisikeDTO_1 = require("../dtos/LikeDisikeDTO");
const BadRequestError_1 = require("../errors/BadRequestError");
const NotFoundError_1 = require("../errors/NotFoundError");
const Post_1 = require("../models/Post");
class LikiDislikeBusiness {
    constructor(postDatabase, likesDislikesDatabase, tokenManager) {
        this.postDatabase = postDatabase;
        this.likesDislikesDatabase = likesDislikesDatabase;
        this.tokenManager = tokenManager;
    }
    editLikeDislikeId(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            const updatedLike = input.like;
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const userId = payload.id;
            const postDB = yield this.postDatabase.findPostId(id);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError(" Não existe um post com esse 'id'");
            }
            const postId = postDB.id;
            if (postDB.creator_id === userId) {
                throw new BadRequestError_1.BadRequestError("Usuário não pode dar like ou dislike no próprio post");
            }
            const likesDislikesDB = yield this.likesDislikesDatabase.LikeUserPostId(userId, postId);
            let deltaLikes = 0;
            let deltaDislikes = 0;
            if (!likesDislikesDB) {
                const newLikesDislikes = new LikeDisikeDTO_1.LikeDislike(userId, postId);
                if (updatedLike) {
                    newLikesDislikes.setLike(1);
                    deltaLikes = 1;
                }
                else {
                    newLikesDislikes.setLike(0);
                    deltaDislikes = 1;
                }
                const newLikesDislikesDB = {
                    user_id: newLikesDislikes.getUserId(),
                    post_id: newLikesDislikes.getPostId(),
                    like: newLikesDislikes.getLike()
                };
                yield this.likesDislikesDatabase.createLike(newLikesDislikesDB);
            }
            else {
                const like = likesDislikesDB.like;
                if ((updatedLike === Boolean(like))) {
                    yield this.likesDislikesDatabase.deleteLikeByUserAndPostId(userId, postId);
                    if (updatedLike) {
                        deltaLikes = -1;
                    }
                    else {
                        deltaDislikes = -1;
                    }
                }
                else {
                    const updatedLike = Number(!like);
                    const updatedLikesDislikes = new LikeDisikeDTO_1.LikeDislike(userId, postId, updatedLike);
                    const updatedLikesDislikesDB = {
                        user_id: updatedLikesDislikes.getUserId(),
                        post_id: updatedLikesDislikes.getPostId(),
                        like: updatedLikesDislikes.getLike()
                    };
                    yield this.likesDislikesDatabase.updateLikeByUserAndPostId(updatedLikesDislikesDB, userId, postId);
                    deltaLikes = updatedLike ? 1 : -1;
                    deltaDislikes = updatedLike ? -1 : 1;
                }
            }
            const updatedPost = new Post_1.Post(postId, postDB.content, postDB.likes + deltaLikes, postDB.dislikes + deltaDislikes, postDB.created_at, postDB.updated_at, {
                id: postDB.creator_id,
                name: ""
            });
            const updatedPostDB = updatedPost.toDBModelBusiness();
            yield this.postDatabase.edittePost(updatedPostDB, postId);
        });
    }
}
exports.LikiDislikeBusiness = LikiDislikeBusiness;
//# sourceMappingURL=LikeDislikeBusiness.js.map