const mongoose = require("mongoose")

const admloginSchema = mongoose.Schema({
    email:{
        type:String
    },
    password:{
        type:String
    },
    secret:{
        type:Number
    }
})

module.exports = mongoose.model("admnlogin",admloginSchema)