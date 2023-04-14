import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
import crypto from "crypto";


export const registerController = async(req,res)=> {
   try{ 
    const {name,phone,password}=req.body;
    //validations
    if(!name){
        return res.send({message:'Name is Required'});
    }
    if(!password){
        return res.send({message:'Password is Required'});
    }
    if(!phone){
        return res.send({message:'Phone is Required'});
    }
   
    const existingUser = await userModel.findOne({phone});
    if(existingUser){
        return res.status(200).send(
            {
                success:false,
                message:'Already Registered',
            }
        );
    }
    //register user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({name,phone,password:hashedPassword}).save();

    res.status(201).send(
        {
            success:true,
            message:"User Register Succesfully",
            user,
        }
    );
}catch(error){
    res.status(500).send({
        success:false,
        message:'Error in Registration',
        error
    })
}
};

export const loginController = async(req,res)=> {
    try{
        const {phone,password}=req.body
        //validation
        if(!phone||!password){
            return res.status(401).send({
                success:false,
                message:'Invalid phone number or password'
            });
        }
        const user = await userModel.findOne({phone});
        if(!user){
            return res.status(401).send({
                success:false,
                message:'Phone number is not registered'
            });
        }
        const match = await comparePassword(password,user.password);
        if(!match){
            return res.status(401).send(
                {
                    success:false,
                    message:'Invalid Password'
                }
            );
        }

        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name:user.name,
                phone:user.phone,
                role:user.role,
            },
            token,
        });
    } catch(error){
        res.status(500).send(
            {
                success:false,
                message:'Error in login',
                error
            }
        )
    }
};