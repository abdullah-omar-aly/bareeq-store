const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    console.log('Cookies: ', req.cookies)
    res.json({message: "root route"})
  })
  

module.exports = router;