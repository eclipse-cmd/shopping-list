import jwt from "jsonwebtoken"
import { JS_TOKEN } from "../constants"


export const jwtSignAuth = async (id: string) => {
    return await jwt.sign(
        { id },
        JS_TOKEN,
        { expiresIn: 24 * 60 * 60 }
    )
}