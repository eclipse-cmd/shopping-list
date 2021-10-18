import express from "express"
import mongoose from "mongoose"
import {
    PORT,
    MONGOURI,
    __prod__
} from "./constants"
import cors from "cors"
import api from "./routes/api"
import path from "path"

const main = async () => {
    const app = express()
    app.use(
        express.urlencoded({
            extended: true
        })
    )
    app.use(cors())
    app.use(express.json())
    mongoose.connect(MONGOURI)
        .then(() => console.log('MongoDB Database Connected'))
        .catch((error) => console.log("DATABASE NOT CONNECTED: ", error))

    //Api routes
    app.use('/api/v1', api)

    //If in production
    if (__prod__) {
        app.use(express.static('client/build'))

        app.get('*', (_, res) => {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        })
    }
    //Start server
    const port = PORT ?? 5050
    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`)
    })
}

main().catch(error => { console.log('MAIN FUNCTION ERROR: ', error) })