



let { Router } = require("express")

// postModel
// userModel
// postMiddle
let jwt = require("jsonwebtoken")
const { postModel } = require("../models/post")
const { userModel } = require("../models/user.model")
const postMiddle = require("../middleware/postMiddleware")
let postRoute = Router()

postRoute.post("/add", postMiddle, (req, res) => {




    let data = req.body
    console.log(data)

    try {
        let savindata = new postModel(data)
        savindata.save()
        res.status(200).send({ "msg": "Post added success fully" })
    } catch (error) {
        res.status(400).send({ "msg": "Somethin went wrong please check" })
    }

})

postRoute.get("/", async (req, res) => {

    // .find( { price: { $ne: 1.99, $exists: true } } )

    if (req.query.min || req.query.max) {
        let userID = req.body.userID
        console.log(userID)
        try {
            let users = await userModel.find({ userID: userID })
            if (users.length > 0) {
                let allpost = await postModel.find({ $and: [{ no_of_comments: { $gte: Number(req.query.max), $lte: Number(req.query.min) } }, { userID: userID }] })
                res.status(200).send({ "data": allpost })
            } else {
                res.status(400).send({ "er": "Somethin went wrong" })
            }
        } catch (error) {
            res.status(400).send({ "er": "Somethin went wrong" })
        }
    } else if (req.query.page) {
        let limit = 3
        let token = req.headers.authorization.split(" ")[1]
        let decoded = jwt.verify(token, 'shhhhh');
        let page = Math.abs(Number(req.query.page))
        let skipdata = 0
        if (page > 1) {
            skipdata = (page - 1) * limit
        }
        try {


            let data = await postModel.find({ userID: decoded.userID }).skip(skipdata).limit(limit)
            if (data.length > 0) {
                res.status(200).send({ "data": data })
            } else {
                res.status(400).send({ "er": "Not avilable" })
            }
        } catch (error) {
            res.status(400).send({ "er": "something went wrong" })
        }
    } else if (req.query.device) {
        let device = req.query.device
        console.log(device)
        try {
            let data = await postModel.find({ device: device })
            if (data.length > 0) {

                res.status(200).send({ "data": data })
            } else {
                res.status(400).send({ "msg": "Nothing as you want" })
            }
        } catch (error) {
            res.status(400).send({ "er": "Somethin went wrong2" })
        }
    } else if (req.query.device1 && req.query.device2) {
        console.log(req.query.device1, req.query.device2)
        try {
            let allpost = await postModel.find({ $or: [{ device: req.query.device1 }, { device: req.query.device2 }] })
            if (allpost.length > 0) {

                res.status(200).send({ "data": allpost })
            } else {
                res.status(400).send({ "er": "Somethin went wrong" })
            }
        } catch (error) {
            res.status(400).send({ "er": "Somethin went wrong" })
        }
    }


    else {
        let userID = req.query.userID

        try {
            let users = await userModel.find({ _id: userID })
            console.log(users)
            if (users.length > 0) {
                console.log(typeof userID, userID)
                let allpost = await postModel.find({ userID: userID })
                console.log(allpost)
                res.status(200).send({ "data": allpost })
            } else {
                res.status(400).send({ "er": "Somethin went wrong" })
            }
        } catch (error) {
            res.status(400).send({ "er": "Somethin went wrong2" })
        }
    }

})

postRoute.patch("/update/:id", async (req, res) => {
    let data = req.body
    let postid = req.params.id
    let token = req.headers.authorization.split(" ")[1]
    let decoded = jwt.verify(token, 'shhhhh');

    try {
        let storeddata = await postModel.findOne({ _id: postid })
        if (storeddata.userID == decoded.userID) {
            await postModel.findByIdAndUpdate({ _id: postid }, data)
            let updateddata = await postModel.findOne({ _id: postid })
            res.status(200).send({ "msg": "Successfully updated", data: updateddata })
        } else {
            res.status(400).send({ "msg": "check credentials" })
        }
    } catch (error) {
        res.status(400).send({ "er": "Something went wrong" })
    }
})

postRoute.delete("/delete/:id", async (req, res) => {
    console.log("hii")
    let postid = req.params.id
    let token = req.headers.authorization.split(" ")[1]
    let decoded = jwt.verify(token, 'shhhhh');
    console.log(postid, decoded)

    try {
        let storeddata = await postModel.findOne({ _id: postid })
        if (storeddata.userID == decoded.userID) {
            await postModel.findByIdAndDelete({ _id: postid })

            res.status(200).send({ "msg": "Successfully deleted" })
        } else {
            res.status(400).send({ "msg": "check credentials" })
        }
    } catch (error) {
        res.status(400).send({ "er": "Something went wrong" })
    }
})
module.exports = postRoute