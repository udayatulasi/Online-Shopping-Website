const express = require("express")
const { check,validationResult } = require('express-validator');

const router = express.Router()

const {getProductById,getProduct,getAllUniqueCategory,getAllProducts,photo,deleteProduct,updateProduct,createProduct}= require("../controllers/product")
const {getUserById}= require("../controllers/user/user")
const {isSignedIn,isAdmin,isAuth}= require("../controllers/auth/auth")

router.param("userId",getUserById)
router.param("productId",getProductById)

// all routes

router.post("/product/create/:userId",isSignedIn,isAuth,isAdmin,createProduct)
router.get("/product/:productId",getProduct)
router.get("/product/photo/:productId",photo)
router.delete("/product/:productId/:userId",isSignedIn,isAuth,isAdmin,deleteProduct)
router.put("/product/:productId/:userId",isSignedIn,isAuth,isAdmin,updateProduct)

router.get("/products",getAllProducts)
router.get("/products/categories",getAllUniqueCategory)
module.exports = router;
