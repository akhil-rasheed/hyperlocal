import express from "express";
import bodyParser from "body-parser";

import {
  joinCommunity,
  createCommunity,
  getCommunity,
} from "../controllers/communityController.js";

const communityRouter = express();

communityRouter.use(bodyParser.json());
communityRouter.use(bodyParser.urlencoded({ extended: true }));

communityRouter.post("/join", joinCommunity);
communityRouter.post("/create", createCommunity);
communityRouter.get("/getOne/:id", getCommunity);
communityRouter.get("/", (req, res) => {
  res.send("Community API");
});

export default communityRouter;
