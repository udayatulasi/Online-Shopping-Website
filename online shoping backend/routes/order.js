const express = require("express")
const router = express.Router()
const {isSignedIn,isAdmin,isAuth}= require("../controllers/auth/auth")
const {getUserById,pushOrderInPurchaseList}= require("../controllers/user/user")
const {getOrderId,getOrderStatus,UpdateStatus,createOrder,getAllOrders}= require("../controllers/order")
const {updatingStock}= require("../controllers/product")

router.param("userId",getUserById)
router.param("orderId",getOrderId)


router.post("/order/create/:userId",isSignedIn
,isAuth,pushOrderInPurchaseList,
updatingStock,createOrder)

router.get("/order/all/:userId",isSignedIn,isAuth,isAdmin,getAllOrders)

// status for order
router.get("/order/status/:userId",isSignedIn,isAuth,isAdmin,getOrderStatus)
router.put("/order/:orderId/status/:userId",isSignedIn,isAuth,isAdmin,UpdateStatus)
module.exports = router;