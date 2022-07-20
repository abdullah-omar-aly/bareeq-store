const jwt = require("jsonwebtoken");
const {ACCESS_TOKEN_SECRET} = require("../envVariables")

// verify access token validation
const verifyJWT = (req, res, next) => {
    const token = req?.cookies.jwt
    console.log(token)
    if (!token) return res.sendStatus(401) //unauthorized
    jwt.verify(token,ACCESS_TOKEN_SECRET, (err , decodedToken) => {
        if (err) {
          console.log(ACCESS_TOKEN_SECRET)
          console.log(err)
          return res.sendStatus(403)
        } //forbidden( invalid token)
        console.log(decodedToken)
        req.user = decodedToken.userInfo.email
        req.roles = decodedToken.userInfo.roles
        next()
    })
  }


module.exports = {verifyJWT}