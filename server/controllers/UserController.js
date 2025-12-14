const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            const hashPass = await bcrypt.compare(password, user.password);
            if (hashPass) {
                const token=jwt.sign({userid:user._id},"secretkey",{expiresIn: "1h"})
                res.status(200).json({msg:"login successfull",token:token,user});
            }
            else {
                res.status(401).send("invalid password");
            }
        }
        else {
            res.status(401).send("user not found");
        }
    } catch (err) {
        res.status(500).send("something went wrong");
    }
}

const registerUser = async (req, res) => {
    try {
        const { email,password,name} = req.body;
        console.log(req.body);
        const hashpass=await bcrypt.hash(password,12);
       const user=await UserModel.create({email,password:hashpass,name});
       if(user){
          res.status(200).send("Account created successflly");
       }
       else{
        res.status(401).send("Unable to create account");
       }
    } catch (err) {
            res.status(500).send("Something went wrong");
    }


}

module.exports = { loginUser, registerUser };