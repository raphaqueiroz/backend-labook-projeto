import { PostDatabase } from "../database/PostDatabase";
import { UserDatabase } from "../database/UserDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/post/createPost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/post/editPost.dto";
import { GetPostsInputDTO, GetPostsOutputDTO } from "../dtos/post/getPosts.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { Post, PostModel } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";


export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) {}


    public createPost = 
        async (input: CreatePostInputDTO): Promise<CreatePostOutputDTO> => {

        const {token, content} = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const id = this.idGenerator.generate()

        const post = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toString(),
            payload.id, // vem do model tokenPayoad
            payload.name // model tokenPayload
        )

        await this.postDatabase.insertPost(post.toDBModel())

        const output: CreatePostOutputDTO = undefined
        return output
         
    }

    public getPosts = 
        async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {

        const {token} = input

        const payload = this.tokenManager.getPayload(token)
        
        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const postsDB = await this.postDatabase.getPosts()

        const postsModel: PostModel[] = [] 

        for (let postDB of postsDB) {
// para cada interação há uma busca no banco de dados buscando o nome do creator => userDB.name
            const userDB = await this.userDatabase.findById(postDB.creator_id)

            const post = new Post(
                postDB.id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at,
                postDB.creator_id,  
                userDB.name
            )

            postsModel.push(post.toBusinessModel())
        }

        const output: GetPostsOutputDTO = postsModel

        return output
         
    }

    public editPost = 
        async (input: EditPostInputDTO): Promise<EditPostOutputDTO> => {

        const {token, content, postId} = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }


        const postDB = await this.postDatabase.findById(postId)

        if (!postDB) {
            throw new NotFoundError("id não existe")
        }

        if (payload.id !== postDB.creator_id) {
            throw new ForbiddenError("somente quem criou o post pode editá-lo")
        }

        const userDB = await this.userDatabase.findById(postDB.creator_id)

        const post =  new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            postDB.creator_id,
            userDB.name
        )

        post.setContent(content)

        await this.postDatabase.updatePost(post.toDBModel())

        const output: EditPostOutputDTO = undefined
        return output
         
    }
} 