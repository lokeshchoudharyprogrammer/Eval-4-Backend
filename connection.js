const mongoose = require("mongoose")

require("dotenv").config()


let connection = mongoose.connect(process.env.API_URL)

module.exports = connection


