const express = require("express");

const router = express.Router()


const {getUserById,getUser,updateUser,ordersList}= require("../../controllers/user/user")
const {isSignedIn,isAuth,isAdmin}= require("../../controllers/auth/auth")

router.param("userId",getUserById)

router.get("/user/:userId",isSignedIn,isAuth,getUser)
router.put("/user/:userId",isSignedIn,isAuth,updateUser)
router.get("/orders/user/:userId",isSignedIn,isAuth,ordersList)
  


module.exports = router;