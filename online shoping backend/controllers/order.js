const {Order,Cart} = require("../models/order/Order")


exports.getOrderId =(req,res,next,id)=>{
    Order.findById(id)
    .populate("products.product","name price")
    .exec((err,order)=>{
        if(err){
            return res.status(400).json({
                error:"no order found in Db"
            })
        }
        req.order = order;
        next();
    })
}


exports.createOrder = (req,res)=>{
    req.body.order.user = req.profile;
    const order = new Order(req.body.order)
    order.save((err,order)=>{
        if(err){
              return res.status(400).json({
                  error:"Failed to save your order in Db"
              })
        }
        res.json(order);
    })
}

exports.getAllOrders=(req,res)=>{

    Order.find()
    .populate("user","_id name")
    .exec((err,orders)=>{
        if(err){
            return res.status(400).json({
                error:"no orders in Db"
            })
        }
        res.json(order )
    })
}

exports.UpdateStatus=(req,res)=>{
res.json(Order.schema.path("status").enumValues);
}

exports.getOrderStatus=(res,req)=>{
        Order.update(
            {_id:req.body.orderId},
            {$set:{status:req.body.status}},
            (err,order)=>{
                if(err){
                    return res.status(400).json({
                        error:"cannot update the status"
                    })
                }
                res.json(order)
            }
        )
}