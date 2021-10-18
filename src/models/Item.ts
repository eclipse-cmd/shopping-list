import mongoose from "mongoose"
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    name: {
        type: String, required: true
    },
    userId: {
        type: String, required: true
    },
    date: {
        type: Date, default: Date.now
    },
    created_at: {
        type: Date, default: Date.now
    },
    updated_at: {
        type: Date, default: Date.now
    },
})

export default mongoose.model('Items', ItemSchema)