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
exports.PostBusiness = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
const ForbiddenError_1 = require("../errors/ForbiddenError");
const NotFoundError_1 = require("../errors/NotFoundError");
const Post_1 = require("../models/Post");
const types_1 = require("../types");
class PostBusiness {
    constructor(postDatabase, userDatabase, postDTO, idGenerator, tokenManager) {
        this.postDatabase = postDatabase;
        this.userDatabase = userDatabase;
        this.postDTO = postDTO;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.deletPost = (input) => __awaiter(this, void 0, void 0, function* () {
            const { id, token } = input;
            if (token === undefined) {
                throw new BadRequestError_1.BadRequestError("token ausent");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("token inválido");
            }
            const postsDB = yield this.postDatabase.findPostId(id);
            if (postsDB === null) {
                throw new NotFoundError_1.NotFoundError("'id' não encontrado");
            }
            const creatorId = payload.id;
            if (postsDB.creator_id !== creatorId && payload.role === types_1.USER_ROLES.NORMAL) {
                throw new BadRequestError_1.BadRequestError("somente quem criou o post pode deletá-lo");
            }
            yield this.postDatabase.deletePost(id);
        });
    }
    getPosts(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const postsDB = yield this.postDatabase.findPosts();
            const usersDB = yield this.userDatabase.findUsers();
            const output = postsDB.map(postDB => {
                const post = new Post_1.Post(postDB.id, postDB.content, postDB.likes, postDB.dislikes, postDB.created_at, postDB.updated_at, getCreator(postDB.creator_id));
                return this.postDTO.getPostOutput(post);
            });
            function getCreator(userId) {
                const user = usersDB.find(userDB => userDB.id === userId);
                return {
                    id: user.id,
                    name: user.name
                };
            }
            return output;
        });
    }
    createPost(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, token } = input;
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const id = this.idGenerator.generate();
            const createdAt = (new Date()).toISOString();
            const likes = 0;
            const dislikes = 0;
            const newPost = new Post_1.Post(id, content, likes, dislikes, createdAt, createdAt, {
                id: payload.id,
                name: payload.name
            });
            const newPostDB = newPost.toDBModelBusiness();
            yield this.postDatabase.createPost(newPostDB);
        });
    }
    editPost(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, id, token } = input;
            const postDB = yield this.postDatabase.findPostId(id);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError("Não foi encontrado um post com esse id");
            }
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            if (payload.id !== postDB.creator_id) {
                throw new ForbiddenError_1.ForbiddenError("Somente quem criou o post pode editá-lo");
            }
            const updatedAt = (new Date()).toISOString();
            const updatedPost = new Post_1.Post(id, content, postDB.likes, postDB.dislikes, postDB.created_at, updatedAt, {
                id: postDB.creator_id,
                name: ""
            });
            const updatedPosts = updatedPost.toDBModelBusiness();
            yield this.postDatabase.edittePost(updatedPosts, id);
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=postBusiness.js.map