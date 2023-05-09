import express from "express";

import { registerController ,loginController,deleteUser} from "../controllers/authController.js"
import { isAdmin,requireSignIn } from "../middlewares/authMiddleware.js";


//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//Delete account
router.delete("/delete",deleteUser);

//protected route auth
router.get("/user-auth", requireSignIn, (res, req) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", isAdmin, requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
