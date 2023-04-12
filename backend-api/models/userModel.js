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
        password:{
            type:String,
            required:true,
            min:6,
        },
        role:{
            type:Number,
             default:0,
        }
    }
    ,{timestamps:true}
);

export default mongoose.model('users',userSchema);