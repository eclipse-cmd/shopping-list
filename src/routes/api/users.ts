import express from "express"
import { auth } from "../../middleware/auth"
import * as UserController from "../../Controller/UserController"

const router = express.Router()

router.get('/', auth, UserController.getUser)
router.post('/create-account', UserController.createUser)
router.post('/login', UserController.loginUser)

export default router