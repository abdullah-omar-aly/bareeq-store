const express = require("express")
const app = express()

require('dotenv').config()
const port = process.env.PORT || 4000 

app.listen(port , () => {
    console.log(`server is running on port ${port}`)
})

const text = process.env.TEXT
app.get('/api' , (req, res) => {
    res.json({text})
})

