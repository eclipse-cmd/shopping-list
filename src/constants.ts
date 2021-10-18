import dotenv from "dotenv"

const result = dotenv.config()
if (result.error) {
    console.error(result.error)
}

export const
    __prod__ = process.env.NODE_ENV === "production",
    PORT = process.env.PORT,
    MONGOURI = `mongodb+srv://admin:${process.env.MONGO_PASS}@cluster0.fjhmh.mongodb.net/shopping_list`,
    JS_TOKEN = process.env.JSONWEBTOKEN_SECRET ?? "js_secret_key_iodfsapjaaifjsdpaaaaaaaaaaa"
