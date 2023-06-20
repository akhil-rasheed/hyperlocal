import express from "express";
import bodyParser from "body-parser";

import {
  joinCommunity,
  createCommunity,
} from "../controllers/communityController.js";

const communityRouter = express();

communityRouter.use(bodyParser.json());
communityRouter.use(bodyParser.urlencoded({ extended: true }));

//Api to getAll nearby news
communityRouter.post("/join", joinCommunity);
communityRouter.post("/create", createCommunity);

export default communityRouter;
