require("dotenv").config()


module.exports = {
    PORT: process.env.PORT || 4000 ,
    MONGO_URL: process.env.MONGO_URL,
    SALT_ROUNDS: process.env.SALT_ROUNDS,
    BCRYPT_PEPPER: process.env.BCRYPT_PEPPER,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
    TEXT: process.env.TEXT,

}
