const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  fname:{
    type:String,
  },
  lname:{
    type:String,
  },
  username: {
    type:String,
  },
  phone:{
    type:Number,
  },
  email: {
    type:String
  },
  password: {
    type:String
  },
  age:{
    type:Number
  },
  Address:{
    type:String
  },
  Image:{
    type:String
  },
  language:{
    type:Array,
    default:[]
  },
  gender:{
    type:String
  },
  genre:{
    type:Array,
    default:[]
  }
})
module.exports = mongoose.model("user",userSchema);
