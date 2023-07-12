import { BaseError } from "./BaseError";
export class ConflictError extends BaseError {
    constructor(
        message: string = "Email já cadastrado" 
    ) {
        super(403, message)
    }
}