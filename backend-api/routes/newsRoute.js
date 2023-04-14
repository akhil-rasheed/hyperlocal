import express from "express";
import bodyParser from "body-parser";
import {createNews,NewsNearBy,updateNews,deleteNews,upvotesNews, downvotesNews} from "../controllers/newsController.js"
import { model } from "mongoose";


const newsRouter = express();

newsRouter.use(bodyParser.json());
newsRouter.use(bodyParser.urlencoded({extended:true}));

//Api to create news
newsRouter.post('/post-news',createNews);

//Api to getAll nearby news
newsRouter.get('/nearBy-news',NewsNearBy);

//Api to update a single news post
newsRouter.put("/:id",updateNews);

//Api to delete a single news post
newsRouter.delete("/:id",deleteNews);

//Api to upvote a news post
newsRouter.put("/:id/upvote",upvotesNews);

//Api to downvote a newspost
newsRouter.put("/:id/downvote",downvotesNews);


export default newsRouter;