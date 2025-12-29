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

const addAddress = async (req, res) => {
    try {
        const userId = req.userid; 
        const { address, city, state, pin } = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(userId,{address,city,state,pin },{ new: true, runValidators: true }
        ).select("-password"); 
        if (!updatedUser) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        res.status(200).json({
            success: true,
            user: updatedUser
        });

    } catch (error) {
        console.error("Update Address Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Server Error: Could not update address" 
        });
    }
};
const getAddress = async (req, res) => {
    try {
       
        const user = await UserModel.findById(req.userid).select("-password");
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }
        res.status(200).json({
            success: true,
            user: {
                name: user.name,
                address: user.address,
                city: user.city,
                state: user.state,
                pin: user.pin,
                email: user.email
            }
        });

    } catch (error) {
        console.error("Get Address Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "Server Error: Could not fetch address" 
        });
    }
};

module.exports = { loginUser, registerUser,addAddress,getAddress }