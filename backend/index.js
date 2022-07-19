const express = require("express")
const app = express()
const products = require("./routes/porducts")

require('dotenv').config()
const port = process.env.PORT || 4000 


app.use('/api/product' , products )

app.listen(port , () => {
    console.log(`server is running on port ${port}`)
})


