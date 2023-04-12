import * as mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    creator:{
        type:String,
        required:true,
        min:3,
        maxlength:30,
    },
    title:{
            type:String,
            maxlength:60,
            required:true,

    },
    desc:{
            type:String,
            maxlength:200,
    },

    // tags: [String],
    likecount:{
        type: Number,
        default:0,
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
    location:{
        type:{type:String,required:true},
        coordinates:[]
    },
});
newsSchema.index({location:"2dsphere"});
export default mongoose.model('news',newsSchema);