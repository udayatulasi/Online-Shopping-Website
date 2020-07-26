const Product = require("../models/product/product")
const formidable = require("formidable")
const _ = require("lodash")
const { check,validationResult } = require('express-validator');

const fs = require("fs")


exports.getProductById =(req,res,next,id)=>{
    Product.findById(id)
    .populate("category")
    .exec((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }

        req.product = product;
        next();
        
    })
}

exports.createProduct =(req,res)=>{
  
let form = new formidable.IncomingForm();
form.keepExtensions = true;


form.parse(req,(err,fields,file)=>{
    if(err){
         return res.status(400).json({
            error:"problem with image"
        })
    }

    // destructure the fields

    const {name,description,price,category,stock} = fields;
    console.log(name,description,price,category,stock)
    if(!name || !description || !price || !category || !stock ){
        return res.status(400).json({
            error:"please include all fields"
        })
    }


    let product = new Product(fields)

    // handle files here
    if(file.photo){
        if(file.photo.size > 3000000){
             return res.status(400).json({
                 error:"file is too big"
             })
        }
        product.photo.data = fs.readFileSync(file.photo.path)
        product.photo.contentType = file.photo.type
    }
    // console.log(product)
    // save to DB

    product.save((err,product)=>{
        if(err){
            return res.status(400).json({
                error:"saving tshirt in DB falled"
            })
        }
        res.json(product);      
    })
})
}

exports.getProduct=(req,res)=>{

    req.product.photo = undefined
    return res.json(req.product)
}

// middleware
exports.photo =(req,res)=>{
    
    console.log(req.product)
        if(req.product.photo.data){
             res.set("Content-type",req.product.photo.contentType)
             return res.send(req.product.photo.data)
            }else{
                    res.send(`https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`)
                }
            
            
}

exports.deleteProduct =(req,res)=>{
    let product = req.product;
    product.remove((err,deletedProduct)=>{
            if(err){
                return res.status(400).json({
                    error:"failed to delete"
                })
            }
    })
    res.json({
        message:"deletion was a  success"
    })
}

exports.updateProduct=(req,res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;    
    form.parse(req,(err,fields,file)=>{
        if(err){
             return res.status(400).json({
                error:"problem with image"
            })
        }

        let product = req.product;

        product = _.extend(product,fields)  
        
        // handle files here
        if(file.photo){
            if(file.photo.size > 3000000){
                 return res.status(400).json({
                     error:"file is too big"
                 })
            }
            product.photo.data = fs.readFileSync(file.photo.path)
            product.photo.contentType = file.photo.type
        }
        // console.log(product)
        // save to DB
    
        product.save((err,product)=>{
            if(err){
                return res.status(400).json({
                    error:"updation of tshirt in DB falled"
                })
            }
            res.json(product);      
        })
    })
}

exports.getAllProducts=(req,res)=>{

    let limit = req.query.limit ? parseInt(req.query.limit) : 8
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    Product.find()              
    .select("-photo")
    .populate("category")
    .sort([[sortBy,"asc"]])
    .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"NO products Found"
            })
        }
        res.json(products)
    })
}


exports.updatingStock =(req,res,next)=>{
    let myOperations = req.body.order.products.map(prod =>{
        return {
            updateOne:{
                filter: {_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    })
    
    Product.bulkWrite(myOperations,{},(err,products)=>{
        if(err){
            return res.status(400).json({
                error:"bulk operations failed"
            })
        }

    next()
    })
}


exports.getAllUniqueCategory=(req,res)=>{
    Product.distinct("category",{},(err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"no category found"
            })
        }
            res.json(cate)
    })
}