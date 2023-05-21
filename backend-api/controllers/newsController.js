import newsModel from "../models/NewsModel.js";
import userModel from "../models/userModel.js";

export const createNews = async (req, res) => {
  try {
    console.log(req.body);
    const imageFilename = req.file ? req.file.filename : null;
    const imageUrl = imageFilename
      ? `https://hyperlocal-backend.fly.dev/uploads/${imageFilename}`
      : null;
    // const User = await userModel.findOne({_id:req.body._id});
    if (!req.body.latitude || !req.body.longitude) {
      res.status(401).send({
        success: false,
        message: "lat and long not found!",
      });
    } else {
      const news = await new newsModel({
        userId: req.body.userId,
        username: req.body.name,
        title: req.body.title,
        desc: req.body.desc,
        location: {
          type: "Point",
          coordinates: [
            parseFloat(req.body.longitude),
            parseFloat(req.body.latitude),
          ],
        },
        imageUrl,
      }).save();
      res
        .status(200)
        .send({ success: true, message: "Stored news", data: news });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

export const NewsNearBy = async (req, res) => {
  try {
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;
    const distWithin = req.body.distWithin * parseFloat(0.621371);
    const nearBynews = await newsModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          key: "location",
          maxDistance: parseFloat(distWithin) * 1609,
          distanceField: "distance calculated",
          distanceMultiplier: 1 / 1000,
          spherical: true,
        },
      },
    ]);
    res.status(200).send({
      success: true,
      message: "retrieving succesfully",
      data: nearBynews,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message,
    });
  }
};

export const allNews = async (req, res) => {
  try {
    console.log("hi");
    const allNews = await newsModel.find();
    res.status(200).send({
      success: true,
      message: "retrieving succesfully",
      data: allNews,
    });
  } catch (error) {}
};

export const updateNews = async (req, res) => {
  try {
    const news = await newsModel.findById(req.params.id);
    if (news.userId == req.body.userId) {
      await news.updateOne({ $set: req.body });
      res.status(200).send("The post has been updated");
    } else {
      res.status(403).send("You can update only your post");
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteNews = async (req, res) => {
  try {
    const news = await newsModel.findById(req.params.id);
    if (news.userId == req.body.userId) {
      await news.deleteOne();
      res.status(200).send("The post has been deleted");
    } else {
      res.status(403).send("You can only delete your post");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const upvotesNews = async (req, res) => {
  try {
    const news = await newsModel.findById(req.params.id);
    if (!news.downvotes.includes(req.body.userId)) {
      await news.updateOne({
        $inc: {
          upvotescount: 1,
          downvotescount: -1,
        },
        $push: { upvotes: req.body.userId },
        $pull: { downvotes: req.body.userId },
      });

      res
        .status(200)
        .json("The post has been upvoted and removed from downvotes");
    } else {
      await news.updateOne({
        $inc: { upvotescount: 1 },
        $push: { upvotes: req.body.userId },
      });
      res.status(200).json("The post has been upvoted");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export const downvotesNews = async (req, res) => {
  try {
    const news = await newsModel.findById(req.params.id);
    if (!news.upvotes.includes(req.body.userId)) {
      await news.updateOne({
        $pull: { upvotes: req.body.userId },
        $inc: {
          upvotescount: -1,
          downvotescount: 1,
        },
        $push: { downvotes: req.body.userId },
      });
      res
        .status(200)
        .json("The post has been downvoted and removed from upvotes");
    } else {
      await news.updateOne({
        $pull: { downvotes: req.body.userId },
        $inc: { upcount: -1 },
      });
      res.status(200).json("The post has been downvoted");
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
