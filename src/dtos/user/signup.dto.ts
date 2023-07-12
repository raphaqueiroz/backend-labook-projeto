import z from "zod"

export interface SignupInputDTO { // interface de entrada
    name: string,
    email: string,
    password: string
}

export interface SignupOutputDTO {// interface de saída
    token: string
}

export const SignupSchema = z.object({
    name: z.string().min(1), //método de verificação de length
    email: z.string().email(),// método de verificação de email (metodos pertenenes ao zod)
    password: z.string().min(1)
}).transform(data => data as SignupInputDTO)