const mongoose = require( "mongoose");
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    roles: {
        type: Array,
        required: true,
        default: [1950]
    }
}, { timestamps: true })

// fire a function before doc saved to db (after db validation and before saving)
userSchema.pre('save', async function(next) {
    this.password =await bcrypt.hash(this.password +process.env.BCRYPT_PEPPER, parseInt(process.env.SALT_ROUNDS))

    next();
  });


const UsersCollection = mongoose.model("User", userSchema)


module.exports = { UsersCollection}