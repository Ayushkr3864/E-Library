const mongoose = require("mongoose")
const dotenv= require('dotenv');
dotenv.config();
const db= process.env.MONGO_URL;


mongoose.connect(db)
.then(function(){
    console.log("connected");
})
.catch(function(err){
    console.log(err);
    
})

module.exports = mongoose.connection;
