import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const createUser = async(req, res) => {
    try {
        const {firstName,lastName,email,password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }

        const user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({message:"User already exists"});
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({firstName,lastName,email,password:hashedPassword});
        return res.status(201).json({message:"User created successfully"});


    } catch (error) {
        console.log(error);
        
    }
}

export const loginUser = async(req, res) => {
    try {
        const {email,password} = req.body;  
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid password"});
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:"1h"});
        return res.status(200).json({message:"Login successful",token});
    } catch (error) {
        console.log(error);
        
    }
}
