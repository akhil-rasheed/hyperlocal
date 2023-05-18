import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/routes.js";
import newsRoutes from "./routes/newsRoute.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";

//configure env
dotenv.config();

//database connection
connectDB();

//rest object
const app = express();

const posts = [{ title: "Hello, mysore!" }];

//Middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("combined"));
app.use(cors());
app.use("/uploads", express.static("uploads"));

//routes

//new routes
app.use("/api", newsRoutes);

//auth routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send(posts);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
