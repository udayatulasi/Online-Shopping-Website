  const mongoose = require("mongoose")
const{ObjectId} = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name: String,
    count:Number,
    price:Number,

})


const Cart = mongoose.model("Cart",CartSchema)



const OrderSchema = new mongoose.Schema({
    products:[CartSchema],
    transaction_id:{},
    amount:{type:Number},
    address: String,
    status:{
        type:String,
        default:"Recieved",
        enum:["Cancelled","Delivered","Shipped","Processing","Recieved"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }

},{timestamps:true});

const Order = mongoose.model("Order",OrderSchema)


module.exports = {Order,Cart}