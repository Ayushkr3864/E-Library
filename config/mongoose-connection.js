const mongoose = require("mongoose")
const config = require("config")
const dbgr = require("debug")("development:mongoose")

mongoose.connect(`${config.get("MONGODB_URI")}/database`)
.then(function(){
    dbgr("connected")
})
.catch(function(err){
    dgbr(err)
})

module.exports = mongoose.connection;
