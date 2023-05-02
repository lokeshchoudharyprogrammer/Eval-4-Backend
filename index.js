

let express = require("express")
require("dotenv").config()
let cors = require("cors")
const userRoute = require("./Routes/userRoutes")
const postRoute = require("./Routes/postRoutes")
const postMiddle = require("./middleware/postMiddleware")
const connection = require("./connection")
let server = express()
server.use(express.json())

server.use(cors())
server.use("/users", userRoute)
server.use("/posts", postRoute)

server.get("/",(req,res)=>{
res.send("Welcome to the Dashboard")
})

server.listen(process.env.PORT_NUMBER ?? 3030, async () => {
    try {
        await connection
        console.log("server done")
    } catch (error) {
        console.log("error ")
    }
    console.log("server")
})