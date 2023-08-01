const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../Model/user.model");
require('dotenv').config()


const userRouter = express.Router();

userRouter.post("/register", async(req,res) => {
    try{
     const {name, email, password, city, DOB} = req.body;
     const addToCart = [];
     const purchasedStock = [];
     const portfolio = [];
    const existingUser = await userModel.findOne({email});
    if(existingUser){
        res.status(400).json({msg: "User already exist, please login"})
    }else{
      bcrypt.hash(password, 5, async(err, hash) => {
        if(err){
            res.status(400).json({error:err})
        }else{
            const user = new userModel({name, email, password:hash, city, DOB, addToCart, purchasedStock, portfolio});
            await user.save();
            res.status(200).json({msg: "User has been registered", user: req.body})
        }
      })
    }
    }catch(err){
        res.status(400).json({error:err})
    }
})


userRouter.post("/login", async(req,res) => {
    try{
      const {email, password} = req.body;
      const user = await userModel.findOne({email});
      if(!user){
        res.status(400).json({msg:"User doesn't exist"});
      }else{
        bcrypt.compare(password, user.password, (err, decode) => {
            if(decode){
                const token = jwt.sign({userId: user._id, name: user.name}, process.env.secretKey)
                res.status(200).json({msg: "Logged In!!", token, name:user.name, id:user._id});
            }else{
                res.status(400).json({error:err});
            }
        })
      }
    }catch(err){
        res.status(400).json({error:err});
    }
})


userRouter.get("/:id", async(req,res) => {
    try{
        const id = req.params.id;
       const user = await userModel.findOne({_id:id});
       if(user){
        res.status(200).json({user});
       }else{
        res.status(404).json({msg: "User not found"});
       }
    }catch(err){
        res.status(400).json({error:err})
    }
})


userRouter.post("/addcart/:id", async(req,res) => {
    try{
       const data = req.body;
      const id = req.params.id;
      const user = await userModel.findOne({_id:id});
      if(user){
         await user.addToCart.push(data);
         await user.save();
         res.status(200).json({msg: "Data has been added"});
      }else{
        res.status(404).json({msg: "User not found"})
      }
    }catch(err){
        res.status(404).json({error:err})
    }
})


userRouter.post("/purchasedStock/:id", async(req,res) => {
    try{
       const data = req.body;
      const id = req.params.id;
      const user = await userModel.findOne({_id:id});
      if(user){
         await user.purchasedStock.push(data);
         await user.save();
         res.status(200).json({msg: "Data has been added"});
      }else{
        res.status(404).json({msg: "User not found"})
      }
    }catch(err){
        res.status(404).json({error:err})
    }
})


userRouter.post("/portfolio/:id", async(req,res) => {
    try{
       const data = req.body;
      const id = req.params.id;
      const user = await userModel.findOne({_id:id});
      if(user){
         await user.portfolio.push(data);
         await user.save();
         res.status(200).json({msg: "Data has been added"});
      }else{
        res.status(404).json({msg: "User not found"})
      }
    }catch(err){
        res.status(404).json({error:err})
    }
})

//done


module.exports = {
    userRouter
}