const express = require("express")

const router = express.Router()

require('dotenv').config()
const text = process.env.TEXT

router.get('/' ,(req, res) => {
    res.json({text})
})

module.exports = router