const { UsersCollection } = require("../models/UserModel")
const jwt = require("jsonwebtoken");
const { isEmail } = require('validator');
const {ACCESS_TOKEN_SECRET , REFRESH_TOKEN_SECRET} = require('../envVariables')


const handleSignUp = async (req, res) => {
    const { username, email, password } = req.body
    if (!email || !password || !username) return res.status(400).json({ err: "email , username and password are requiered." })

    // username validation
    const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const validUser = USER_REGEX.test(username);
    if (validUser === false) return res.status(400).json({ err: "invalid username" })
    // email validation
    if (isEmail(email) === false) return res.status(400).json({ err: "invalid email" })
    // password validation
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const validPassword = PWD_REGEX.test(password);
    if (validPassword == false) return res.status(400).json({ err: "invalid password" })

    try {
        const user = await UsersCollection.create({ username, email, password })
        if (user) {
            // JWTs
            const accessToken = jwt.sign(
                { id: user._id },
                ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            );
  

            console.log(accessToken)

  
            res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
            res.status(201).json({ userId: user._id, username: user.username, accessToken })
        }

    } catch (err) {
        console.log(err)
        if (err.code === 11000) {
            return res.sendStatus(409) //conflict
        }
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {handleSignUp}

