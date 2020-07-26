
var express = require("express")
var router = express.Router()
const { check,validationResult } = require('express-validator');
const {signout,signup,signin,isSignedIn}= require("../../controllers/auth/auth"); 

router.get("/signout",signout);
router.post("/signup",[
    check("name","name should be atleast 3char").isLength({ min: 3}),
    check("email","email is incorrect").isEmail(),
    check("password","password  should be atleast 3char").isLength({ min: 3})
], signup)

router.post("/signin",[
    check("email","email is incorrect").isEmail(),
    check("password","password is required").isLength({ min: 1})
], signin)


router.get("/testroute",isSignedIn,(req,res)=>{
    res.json(req.auth)
})

module.exports = router;