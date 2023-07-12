import z from "zod"

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface LoginOutputDTO {
    token: string
}

export const LoginSchema = z.object({ // responsável pela  validação dos tipos recebidos;
    email: z.string().email(),
    password: z.string().min(1)
}).transform(data => data as LoginInputDTO) // transforma as informações para o formato definido;