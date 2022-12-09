 const User=require('../models/user');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');

exports.authentication=async(req,res,next)=>{
    try{
      const token=req.header('Authentication');
      const user=jwt.verify(token,'4Defl1e5Ghdb8JUys6YZ2jxOrtAhajdJjHgU');
      User.findById(user.expenseuserId)
      .then(user=>{
  req.user=user;
  next();
      }).catch(err=>{throw new Error(err)});
    }catch(err){console.log(err)
   return  res.status(401).json({success:false})
    }
}

