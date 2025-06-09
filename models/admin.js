const mongoose = require("mongoose")

 const adminSchema = mongoose.Schema({
    fname:{
        type:String
    },
    phone:{
        type:Number,
    },
    email:{
        type: String,
        trim:true
    },
    password:{
        type:String
    },
    secret:String
})


module.exports = mongoose.model("admin",adminSchema)