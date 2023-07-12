import { UserDatabase } from "../database/UserDatabase"
import { LoginInputDTO, LoginOutputDTO } from "../dtos/user/login.dto"
import { SignupInputDTO, SignupOutputDTO } from "../dtos/user/signup.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { ConflictError } from "../errors/ConflictError"
import { NotFoundError } from "../errors/NotFoundError"
import { TokenPayload, USER_ROLES, User } from "../models/User"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"


export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}


    public signup = async (input: SignupInputDTO): Promise<SignupOutputDTO> => {

        const {name, email, password} = input

        const isEmail = await this.userDatabase.findByEmail(email)
        if(isEmail){
            throw new ConflictError("Email já cadastrado")
        }

        const id = this.idGenerator.generate()
        const hashedPasword = await this.hashManager.hash(password)


        const user = new User(
            id,
            name,
            email,
            hashedPasword,
            USER_ROLES.NORMAL,
            new Date().toISOString()
        )

        await this.userDatabase.insertUser(user.toDBModel())

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole(),

        }
        const token = this.tokenManager.createToken(payload)

        const response: SignupOutputDTO = {
            token: token
        }

        return response
    }

    public login = async (input: LoginInputDTO): Promise<LoginOutputDTO> => {

        const {email, password} = input

        const userDB = await this.userDatabase.findByEmail(email)

        if (!userDB) {
            throw new NotFoundError("Email não registrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const isPasswordCorrect = await this.hashManager
        .compare(password, user.getPassword()) // compara a senha iserida pelo usuário com a senha que se encontra hasheada no DB;
        
        if (!isPasswordCorrect) {
            throw new BadRequestError("senha incorreta")
        }

        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole(),

        }

        const token = this.tokenManager.createToken(payload)

        const response: LoginOutputDTO = {
            token: token
        }

        return response

    }
}