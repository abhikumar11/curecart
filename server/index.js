const express=require("express");
const app=express();
const bodyparser=require("body-parser");
const cors=require("cors");
const connectDb = require("./config/DbConnection");

connectDb();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(require("./routes"));

app.listen(3001,()=>{
    console.log("Server running on port 3001");
})