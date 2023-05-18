import express from "express";
import bodyParser from "body-parser";

import {
  createNews,
  NewsNearBy,
  updateNews,
  deleteNews,
  upvotesNews,
  downvotesNews,
  allNews,
} from "../controllers/newsController.js";
import { model } from "mongoose";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const newsRouter = express();

newsRouter.use(bodyParser.json());
newsRouter.use(bodyParser.urlencoded({ extended: true }));

//Api to create news
newsRouter.get("/getAll", allNews);

newsRouter.post("/post-news", createNews);

//Api to getAll nearby news
newsRouter.get("/nearBy-news", NewsNearBy);

//Api to update a single news post
newsRouter.put("/:id", requireSignIn, updateNews);

//Api to delete a single news post
newsRouter.delete("/:id", requireSignIn, deleteNews);

//Api to upvote a news post
newsRouter.put("/:id/upvote", requireSignIn, upvotesNews);

//Api to downvote a newspost
newsRouter.put("/:id/downvote", requireSignIn, downvotesNews);

export default newsRouter;
