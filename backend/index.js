const express = require("express")
const app = express()
const products = require("./routes/porducts")
const {PORT , MONGO_URL} =  require('./envVariables')
const mongoose = require("mongoose")
const cors = require("cors")
const cookieParser = require('cookie-parser');
const {corsOptions , credentials} = require("./config/cors_options");
const {ROLES_LIST} = require("./config/roles_list")
const {verifyJWT} = require('./middleware/verifyJWT')
const {verifyRoles} = require("./middleware/verifyRoles")
  

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/public', express.static(process.cwd() + '/public'));

// routes
app.use('/', require('./routes/root'));
app.use("/api/auth/signup", require('./routes/register'))
app.use('/api/auth/login', require('./routes/auth'));
app.use('/api/auth/logout', require('./routes/logout'));

// app.use('/refresh' , require('./routes/refreshToken'))

app.get('/private'  , verifyJWT ,  verifyRoles(ROLES_LIST.User) , (req , res ) => {
  res.json('private route accessed')
})

app.get('/admin'  , verifyJWT ,verifyRoles(ROLES_LIST.Admin) , (req , res ) => {
  res.json('admin route accessed')
})


app.use('/api/product' , products )

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('mongodb connected')
    app.listen( PORT , () => {
        console.log(`server is running on port ${PORT}`)
    })
  })
  .catch((err) => console.log(`there is an error: ${err}`));



















