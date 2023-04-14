import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            min:3,
            maxlength:30,
            required:true,
            unique:true,
        },
        phone:{
            type:String,
            required:true,
            unique:true,
            min:10,
            maxlength:10,
        },
        password:{
            type:String,
            required:true,
            min:3,
        },
        role:{
            type:Number,
             default:0,
        }
    }
    ,{timestamps:true}
);

export default mongoose.model('users',userSchema);