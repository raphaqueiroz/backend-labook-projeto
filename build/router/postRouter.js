"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const postBusiness_1 = require("../business/postBusiness");
const PostController_1 = require("../controller/PostController");
const PostDatabase_1 = require("../database/PostDatabase");
const UserDatabase_1 = require("../database/UserDatabase");
const PostsDTO_1 = require("../dtos/PostsDTO");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
const postController = new PostController_1.PostController(new postBusiness_1.PostBusiness(new PostDatabase_1.PostDatabase(), new UserDatabase_1.UserDatabase(), new PostsDTO_1.PostDTO(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager()), new PostsDTO_1.PostDTO());
exports.postRouter = express_1.default.Router();
exports.postRouter.get("/", postController.getPosts);
exports.postRouter.post("/", postController.createPost);
exports.postRouter.put("/:id", postController.editPost);
exports.postRouter.delete("/:id", postController.deletePost);
//# sourceMappingURL=postRouter.js.map