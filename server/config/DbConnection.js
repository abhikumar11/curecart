const mongoose=require("mongoose");
require("dotenv").config();
const connectDb=()=>{
      mongoose.connect(`${process.env.DBCONN}`)
            .then(()=>{console.log("Db Connected Successfully")})
            .catch(()=>{console.log("Unable to connect to db")})    
}
module.exports=connectDb;