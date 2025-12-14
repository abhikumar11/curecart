const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email: email });
        if (user) {
            const verify = await bcrypt.compare(password, user.password);
            if (verify) {
                res.send(200).send("login successfull");
            }
            else {
                res.send(401).send("invalid password");
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
        const hashpass=await bcrypt.hash(password,10);
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