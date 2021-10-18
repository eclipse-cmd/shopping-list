import express from "express"
import * as ItemsController from "../../Controller/ItemController"

const router = express.Router()

//Public routes
router.get('/', ItemsController.getItems)
router.get('/:id', ItemsController.getItem)
router.post('/', ItemsController.createItem)
router.post('/delete', ItemsController.deleteItem)

export default router