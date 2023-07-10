import express from "express";
import { PostBusiness } from "../business/postBusiness";
import { PostController } from "../controller/PostController";
import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { PostDTO } from "../dtos/PostsDTO";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export const postRouter = express.Router();


const postController = new PostController(
    new PostBusiness(
        new PostDatabase(),
        new UserDatabase(),
        new PostDTO(),
        new IdGenerator(),
        new TokenManager()
    ),
    new PostDTO()
);


postRouter.get("/", postController.getPosts);
postRouter.post("/", postController.createPost);
postRouter.put("/:id", postController.editPost);
postRouter.delete("/:id", postController.deletePost);