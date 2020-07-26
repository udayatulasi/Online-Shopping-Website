const Category = require("../models/category.js/category")


exports.getcategoryById=(req,res,next,id)=>{
  Category.findById(id).exec((err,cate)=>{
      if(err){
          return res.status(400).json({
              error:"Category not found"
          })
      }
      req.category =cate;
  })
    next();
}

exports.createCategory =(req,res)=>{
    const category = new Category(req.body);

    category.save((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Not able to save Category"
            });
        }
        else{
        res.json({category})
        }
    })

}

exports.GetAllCategory =(req,res)=>{
    Category.find().exec((err,items)=>{
        if(err){
            return res.status(400).json({
                error:"Not Category"
            });
        }
        res.json(items);
    })
}

exports.GetACategory=(req,res)=>{
        return res.json(req.category)
}

exports.UpdateACategory=(req,res)=>{
    const category = req.category;

    category.name = req.body.name;


    category.save((err,updated)=>{
        if(err){
            return res.status(400).json({
                error:"Not Category"
            });
        }
        res.json(updated)

    })

}


exports.removeCategory=(req,res)=>{
    const category = req.category;

    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                error: "Failed to delete this category"
            })
        }

        res.json({
            message:"Successfull deleted"
        })
    })
}