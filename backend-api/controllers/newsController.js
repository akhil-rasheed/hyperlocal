import newsModel from "../models/NewsModel.js"
import userModel from "../models/userModel.js";


export const createNews = async(req,res) => {
    
    try{
        // const User = await userModel.findOne({_id:req.body._id});
        if(!req.body.latitude|| !req.body.longitude){
            res.status(401).send({
                success:false,
                message:'lat and long not found!'
            });
        } else {
            const news = await new newsModel({
                creator:'anonymous',
                title: req.body.title,
                desc:req.body.desc,
                location:{
                    type:"Point",
                    coordinates:[parseFloat(req.body.longitude),parseFloat(req.body.latitude)]
                }
            }).save();
            res.status(200).send({success:true,
            message:'Stored news',
            data:news
            });
        }

    } catch (error){
        res.status(400).send(error.message);
    }

};


export const NewsNearBy = async(req,res) => {

    try{
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        const distWithin = (req.body.distWithin)*parseFloat(0.621371);
        const nearBynews = await newsModel.aggregate(
            [
                {
                $geoNear:{
                    near:{type:"Point",
                    coordinates:[parseFloat(longitude),parseFloat(latitude)]},
                    key:"location",
                    maxDistance:parseFloat(distWithin)*1609,
                    distanceField:"distance calculated",
                    distanceMultiplier:1/1000,
                    spherical:true,

                }
                }
            ]
        );
        res.status(200).send({
        success:true,
        message:"retrieving succesfully",
        data:nearBynews
    });

    } catch(error){
        res.status(400).send({
            success:false,
            message:error.message,
        }
            );
    }
};

