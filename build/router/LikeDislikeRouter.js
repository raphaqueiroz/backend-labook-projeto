"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeDislikeRouter = void 0;
const LikeDislikeBusiness_1 = require("../business/LikeDislikeBusiness");
const LikeDislikeController_1 = require("../controller/LikeDislikeController");
const LikeDislikesDatabase_1 = require("../database/LikeDislikesDatabase");
const PostDatabase_1 = require("../database/PostDatabase");
const LikeDisikeDTO_1 = require("../dtos/LikeDisikeDTO");
const TokenManager_1 = require("../services/TokenManager");
const express_1 = __importDefault(require("express"));
const likeDislikeController = new LikeDislikeController_1.LikeDislikeController(new LikeDislikeBusiness_1.LikiDislikeBusiness(new PostDatabase_1.PostDatabase(), new LikeDislikesDatabase_1.LikeDislikeDatabase(), new TokenManager_1.TokenManager()), new LikeDisikeDTO_1.LikeDislikeDTO());
exports.likeDislikeRouter = express_1.default.Router();
exports.likeDislikeRouter.put("/:id/like", likeDislikeController.editLikeDislike);
//# sourceMappingURL=LikeDislikeRouter.js.map