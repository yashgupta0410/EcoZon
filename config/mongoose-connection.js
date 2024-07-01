const mongoose=require('mongoose');
const config=require('config');
const dbgr=require("debug")("development:mongoose");

mongoose
.connect(`${config.get("MONGODB_URI")}/scratch`)
.then(function(){ //if connected
    dbgr("server connected!");
})
.catch(function(err){
    console.log(err);
})

module.exports= mongoose.connection;