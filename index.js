

let express = require("express")
require("dotenv").config()
let cors = require("cors")
const userRoute = require("./Routes/userRoutes")
const postRoute = require("./Routes/postRoutes")
const postMiddle = require("./middleware/postMiddleware")
const connection = require("./connection")
let app = express()
app.use(express.json())

app.use(cors())
app.use("/users", userRoute)
app.use("/posts", postRoute)

app.listen(process.env.PORT_NUMBER ?? 3030, async () => {
    try {
        await connection
        console.log("server done")
    } catch (error) {
        console.log("error ")
    }
    console.log("server")
})