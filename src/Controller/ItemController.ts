import Item from "../models/Item"
import { customResponse } from "../Helper/ResponseServices"

export const
    //@route GET api/v1/items
    //@desc Get all items
    //@access Public
    getItems = (req: any, res: any) => {
        Item.find({userId: req.user._id})
            .sort({ date: -1 })
            .then((items: any) => {
                res.json(customResponse("", true, items))
            }).catch((error) => {
                console.log(error)
            })
    },

    //@route GET api/v1/item
    //@desc Get a single item
    //@access Public
    getItem = (req: any, res: any) => {
        Item.findOne({ _id: req.params.id })
            .then((item) => {
                res.json(customResponse("", true, item))
            })
            .catch(() => {
                res.json(customResponse("Item not found", false))
            })
    },

    //@route POST api/v1/items
    //@desc Create an item
    //@access Public
    createItem = (req: any, res: any) => {
        const newItem = new Item({
            name: req.body.name,
            userId: req.user._id
        })

        newItem.save()
            .then((item: any) => {
                res.send(customResponse("Item created successfully", true, item))
            })
            .catch((error: any) => {
                res.status(400).send(customResponse(`${error}`, false))
            })
    },

    //@route DELETE api/v1/items
    //@desc Delete an item
    //@access Public
    deleteItem = (req: any, res: any) => {
        Item.findById(req.body.id)
            .then((item) => {
                if (!item) res.json(customResponse("No item found", false))
                item.remove()
                    .then(() => {
                        res.send(customResponse("Item deleted successfully", true))
                    })
            })
            .catch((error) => {
                res.status(400).send(customResponse(`${error}`, false))
            })
    }
