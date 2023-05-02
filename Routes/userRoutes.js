


let { Router } = require("express")

const { postModel } = require("../models/post")
const { userModel } = require("../models/user.model")
const postMiddle = require("../middleware/postMiddleware")
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")
let userRoute = Router()

userRoute.post("/register", async (req, res) => {
    let data = req.body

    try {
        let storeddata = await userModel.find({ email: data.email })

        if (storeddata.length === 0) {

            await bcrypt.hash(data.password, 10, function (err, hash) {
                let savingdata = new userModel({ ...data, password: hash })
                savingdata.save()
                res.status(200).send({ "msg": "Succcessfully signup" })
            });

        } else {
            res.status(400).send({ "msg": "User already exist, please login" })
        }
    } catch (error) {
        res.status(400).send({ "msg": "User already exist, please login2" })
    }

})

userRoute.post("/login", async (req, res) => {
    let data = req.body
    try {

        let storeddata = await userModel.findOne({ email: data.email })
        console.log(storeddata, "ll")
        if (storeddata) {
            console.log("if")
            bcrypt.compare(data.password, storeddata.password, function (err, result) {
                if (result) {
                    var token = jwt.sign({ userID: storeddata._id }, 'shhhhh');
                    res.status(200).send({ "msg": "Successfully login", token: token })
                } else {
                    res.status(400).send({ "msg": "password is wrong" })
                }
            });

        } else {
            res.status(400).send({ "msg": "Please signup first" })
        }
    } catch (error) {
        res.status(400).send({ "msg": "something went wrong" })
    }
})
module.exports = userRoute