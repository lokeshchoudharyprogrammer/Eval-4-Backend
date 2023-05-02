const  mongoose  = require("mongoose")

// name ==> String
// email ==> String
// gender ==> String
// password ==> String

let usersSchema = mongoose.Schema({
    name: { type: String },
    email: { type: String },
    gender: { type: String },
    password: { type: String }
})

const  userModel = mongoose.model("user", usersSchema)


module.exports = {
    userModel
}