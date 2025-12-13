const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            const verify = bcrypt.compare(password, user.password);
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

module.exports = { login };