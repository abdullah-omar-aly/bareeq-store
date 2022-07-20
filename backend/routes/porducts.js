const express = require("express")

const router = express.Router()

const ENV = require("../envVariables")

router.get('/' ,(req, res) => {
    res.json({text : ENV.TEXT})
})

module.exports = router