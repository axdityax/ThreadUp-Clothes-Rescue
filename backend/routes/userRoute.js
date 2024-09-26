import express from "express";
import {
	loginUser,
	registerUser,
	getAllAddress,
	addAddress,
	removeAddress,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/alladdress", authMiddleware, getAllAddress);
userRouter.post("/address/add", authMiddleware, addAddress);
userRouter.post("/address/remove", authMiddleware, removeAddress);

export default userRouter;
