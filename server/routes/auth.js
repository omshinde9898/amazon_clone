const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const authRouter = express.Router();
const jwt = require('jsonwebtoken');

authRouter.post('/api/signup', async(req,res)=>{
   const {name,email,password} = req.body;

   const existingUser = await User.findOne({email});
   try {
    if(existingUser){
        return res.status(400).json({msg:"user exists!"});
    }
    
    const hashPassword = await bcrypt.hash(password,8);

    let user = new User({
        email,
        password:hashPassword,
        name,
       });
       user = await user.save();
       res.json(user);
   } catch (e) {
    res.status(500).json({error:e.message});
   }
});



//Sign in Route
authRouter.post('/api/signin', async(req,res)=>{
    try {
        const {email,password} = req.body;

        const user = User.findOne(email);
        if(!user){
            res.status(400).json({msg:"User Does not exist"});
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Incorrect Password"})
        }

        const token = jwt.sign({id:user._id},"PasswordKey");

        res.json({token,...user._doc});

    } catch (e) {
        res.status(500).json({error:e.message});
    }
});



module.exports = authRouter;