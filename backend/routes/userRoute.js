import express from "express";
import {
	loginUser,
	registerUser,
	getAllAddress,
	addAddress,
	removeAddress,
	getAddressById,
} from "../controllers/userController.js";
import { getAllCenters, getCenterById } from "../controllers/centerController.js";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/alladdress", authMiddleware, getAllAddress);
userRouter.post("/address/add", authMiddleware, addAddress);
userRouter.post("/address/remove", authMiddleware, removeAddress);
userRouter.get("/address/:id", authMiddleware, getAddressById); // Fetch address by ID
userRouter.get("/center/:id", authMiddleware, getCenterById); // Fetch center by ID
userRouter.get("/allcenter", authMiddleware, getAllCenters);

export default userRouter;
