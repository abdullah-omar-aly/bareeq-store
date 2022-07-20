const bcrypt = require("bcrypt")
const { UsersCollection } = require("../models/UserModel")
const jwt = require("jsonwebtoken");
const {
    BCRYPT_PEPPER,
    ACCESS_TOKEN_SECRET
} = require("../envVariables")



const handleSingIn = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.sendStatus(400)


    try {
        // returns null if not registered
        const foundUser = await UsersCollection.findOne({ email })
        if (!foundUser) throw Error("Email isn't registered")  //Unauthorized 
        const match = await bcrypt.compare(password + BCRYPT_PEPPER, foundUser.password);
        console.log(match)
        if (match === false) throw Error("Incorrect password")
        // const roles = foundUser.roles.filter(Boolean) //if one of the roles return null
        // JWTs
        const accessToken = jwt.sign(
            { id: foundUser._id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "30s" }
        );

        console.log(accessToken)
  
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })

        // in the frontend app we will store that access token in memory for safety
        res.json({ user: foundUser.username, id: foundUser._id, accessToken })


    } catch (error) {
        console.log(error)
        res.status(500).json({ 'message': error.message });
    }
}

module.exports = { handleSingIn }

