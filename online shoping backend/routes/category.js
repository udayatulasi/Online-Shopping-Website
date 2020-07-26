const express = require("express")
const router = express.Router();


const {getcategoryById,createCategory,removeCategory,UpdateACategory,GetACategory,GetAllCategory}= require("../controllers/category")
const {isSignedIn,isAuth,isAdmin}= require("../controllers/auth/auth")
const {getUserById}= require("../controllers/user/user")
 
// params
router.param("userId",getUserById)
router.param("categoryId",getcategoryById)

// actual routes

// create
router.post(
    "/category/create/:userId",
    isSignedIn,
    isAuth,
    isAdmin,
    createCategory)
    
    // read
    router.get("/category/:categoryId", GetACategory)
    router.get("/categorys", GetAllCategory)

    // update
    router.put(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuth,
    isAdmin,
    UpdateACategory)
    
    // delete
    router.delete(
    "/category/:categoryId/:userId",
    isSignedIn,
    isAuth,
    isAdmin,
    removeCategory)

module.exports = router;