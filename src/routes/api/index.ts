import express from "express"
import { auth } from "../../middleware/auth"
import Item from "./items"
import User from "./users"

const router = express.Router()
router.use('/item', auth, Item)
router.use('/user', User)

export default router