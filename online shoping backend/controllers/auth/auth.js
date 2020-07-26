const User = require("../../models/user/user")
const { check,validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var expressjwt = require('express-jwt');
const { token } = require("morgan");


exports.signin = (req,res)=>{
    const {email,password} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }

    User.findOne({email},(err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error:"User doesn't not exists"
            })
        }

        if(!user.autheticate(password)){
            return res.status(401).json({
                error:"Email and password do not match"
            })
        }

        // jwt token

        const token = jwt.sign({_id:user._id},process.env.SECRET, { expiresIn:  365*60* 60 });//, { expiresIn: 60 * 60 }
        // put token in cookie
        res.cookie("token",token);

        // send response to front end


         const {_id,name,email,role}= user;

        return res.json({token, user:{_id,name,email,role}})

    })
}

exports.signout = (req,res)=>{

    res.clearCookie("token")
    res.json({
        message: "User signout successfullyx"
    });
};

exports.signup =(req,res)=>{
        const em = req.body.email;
        User.findOne({em},(err,user)=>{
                   console.log(err,user)
               if(
                   err || user){
               return res.status(400).json({
                    error:"already user exist"
                       })
                }
        })

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    
   const user = new User(req.body)

   user.save((err,user)=>{
       if(err){
           return res.status(400).json({
               error:"User already exist"
           })
       }
       res.json({
        name:user.name,
        email:user.email,
        id:user._id,
    })
   });
   
}


// protected routes
exports.isSignedIn= 

// (req,res,next)=>{
// let token =req.headers.authorization.split(" ");
// let Otoken = token[1]
        
//     console.log(Otoken);
//     jwt.verify(Otoken,process.env.SECRET,function(err, decoded) {
//         // console.log(decoded)
//         // console.log(err) 
    
        
//       })
//       next();
//     }


expressjwt({
    secret:process.env.SECRET,
    userProperty:"auth",
});



// custom middlewares
exports.isAuth =(req,res,next)=>{
    let token =req.headers.authorization.split(" ");
    let Otoken =token[1];
    // console.log(token);
    jwt.verify(Otoken,process.env.SECRET,(err, decoded)=> {
        if(err){ 
        return res.status(403).json({
            error:"token expired"
        })}
      })
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}

exports.isAdmin =(req,res,next)=>{
    if(req.profile.role=== 0){
        return res.status(403).json({
            error:"you are not admin"
        })
    }    
    next();
}

