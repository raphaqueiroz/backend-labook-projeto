
import { response } from "express";
import { PostDB } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    public insertPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .insert(postDB)
    }

    public getPosts = async (): Promise<PostDB[]> => {
        return BaseDatabase.connection(PostDatabase.TABLE_POSTS)
    }

    public findById = async (id: string): Promise<PostDB | undefined> => {
        const [postDB]: PostDB[] = await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({id: id})

        return postDB
    }

    public updatePost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase
        .connection(PostDatabase.TABLE_POSTS)
        .update({ content: postDB.content})
        .where({id: postDB.id})
    }
}