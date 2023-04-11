import express from "express";

const router = express.Router();



router.post("/post", (req, res) => {
  res.send("Post API");
});

router.get("/getAll", (req, res) => {
  res.send("Get All API");
});

router.get("/getOne/:id", (req, res) => {
  res.send("Get by ID API");
});

router.patch("/update/:id", (req, res) => {
  res.send("Update by ID API");
});

router.delete("/delete/:id", (req, res) => {
  res.send("Delete by ID API");
});


export default router;