"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDislikeDTO = exports.LikeDislike = void 0;
const BadRequestError_1 = require("../errors/BadRequestError");
class LikeDislike {
    constructor(userId, postId, like = 0) {
        this.userId = userId;
        this.postId = postId;
        this.like = like;
    }
    getUserId() {
        return this.userId;
    }
    setUserId(value) {
        this.userId = value;
    }
    getPostId() {
        return this.postId;
    }
    setPostId(value) {
        this.postId = value;
    }
    getLike() {
        return this.like;
    }
    setLike(value) {
        this.like = value;
    }
}
exports.LikeDislike = LikeDislike;
class LikeDislikeDTO {
    constructor() {
        this.editPostLikes = (id, like, token) => {
            if (typeof like !== "boolean") {
                throw new BadRequestError_1.BadRequestError("'like' deve ser um boolean");
            }
            if (typeof token !== "string") {
                throw new BadRequestError_1.BadRequestError("Token inválido");
            }
            const result = {
                id,
                like,
                token
            };
            return result;
        };
    }
}
exports.LikeDislikeDTO = LikeDislikeDTO;
//# sourceMappingURL=LikeDisikeDTO.js.map