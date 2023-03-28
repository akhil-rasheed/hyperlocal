const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();

const posts = [{ title: "Hello, mysore!" }];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.send(posts);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("listening on port 3001");
});
