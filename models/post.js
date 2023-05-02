const  mongoose  = require("mongoose")

//

let postSchema = mongoose.Schema({
    title: { type: String },
    body: { type: String },
    device: { type: String }
})

const postModel = mongoose.model("post", postSchema)


module.exports={
    postModel
}