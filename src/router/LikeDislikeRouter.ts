import { LikiDislikeBusiness } from "../business/LikeDislikeBusiness";
import { LikeDislikeController } from "../controller/LikeDislikeController";
import { LikeDislikeDatabase } from "../database/LikeDislikesDatabase";
import { PostDatabase } from "../database/PostDatabase";
import { LikeDislikeDTO } from "../dtos/LikeDisikeDTO";
import { TokenManager } from "../services/TokenManager";
import express from "express";

const likeDislikeController = new LikeDislikeController(
    new LikiDislikeBusiness(
        new PostDatabase(),
        new LikeDislikeDatabase(),
        new TokenManager()
    ),
    new LikeDislikeDTO()
);

export const likeDislikeRouter = express.Router();

likeDislikeRouter.put("/:id/like", likeDislikeController.editLikeDislike);


