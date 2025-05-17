const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    book:String,
    author:String,
    link:String,
    Image:String,
    description:String
})

module.exports = mongoose.model("books", bookSchema)