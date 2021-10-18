import jwt from "jsonwebtoken"
import User from "../models/User"
import { customResponse } from "../Helper/ResponseServices"
import { JS_TOKEN } from "../constants"

export const
    auth = (req: any, res: any, next: any) => {
        const token = req.header('x-auth-token')
        if (!token) return res.status(404).json(customResponse("Authorization token not found", false))

        try {
            const decoded = jwt.verify(token, JS_TOKEN)
            req.id = decoded
            User.findOne({ _id: req.id.id })
                .select('-password')
                .then((user) => {
                    if (!user) return res.json(customResponse("No user found", false))
                    req.user = user
                    next();
                })
                .catch((error) => {
                    return res.json(customResponse(error ?? "No user found", false))
                })
        } catch (error) {
            return res.status(401).json(customResponse("Authorization failed", false))
        }
    }