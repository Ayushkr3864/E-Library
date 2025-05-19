const mongoose = require("mongoose")
const dotenv= require('dotenv');
dotenv.config();
const db= process.env.MONGO_URL;
mongoose.connect(db,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(db);

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
