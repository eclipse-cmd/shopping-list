import mongoose from "mongoose"
const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String, required: true
    },
    last_name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true 
    },
    created_at: {
        type: Date, default: Date.now
    },
    updated_at: {
        type: Date, default: Date.now
    },
}) 

export default mongoose.model('User', UserSchema)

