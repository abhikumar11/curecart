const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const cors=require("cors");



app.listen(3001,()=>{
    console.log("Server running on port 3001");
})