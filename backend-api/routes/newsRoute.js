import express from "express";
import bodyParser from "body-parser";
import {createNews,NewsNearBy} from "../controllers/newsController.js"
import { model } from "mongoose";


const newsRouter = express();

newsRouter.use(bodyParser.json());
newsRouter.use(bodyParser.urlencoded({extended:true}));

//Api to create news
newsRouter.post('/post-news',createNews);

//Api to getAll nearby news
newsRouter.get('/nearBy-news',NewsNearBy);


export default newsRouter;