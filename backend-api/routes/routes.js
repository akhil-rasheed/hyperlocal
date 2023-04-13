import express from "express";

const router = express.Router();






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