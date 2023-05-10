import * as mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
            type:String,
            maxlength:60,
            required:true,

    },
    desc:{
            type:String,
            maxlength:300,
    },

    tags: {
        type:Array,
        default:[],
    },
    upvotes:{
        type:Array,
        default:[]
    },
    upvotescount:{
        type: Number,
        default:0,
    },
    downvotes:{
        type:Array,
        default:[],
    },
    downvotescount:{
        type:Number,
        default:[],
    },
    createdAt:{
        type:Date,
        default:new Date(),
    },
    location:{
        type:{type:String,required:true},
        coordinates:[]
    },

},{expires:1,expireAfterSeconds:60});
newsSchema.index({location:"2dsphere"});
export default mongoose.model('news',newsSchema);