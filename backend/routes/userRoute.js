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
import { createSubmission, getUserSubmissions } from "../controllers/submissionController.js";
import multer from "multer";

const userRouter = express.Router();

const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}${file.originalname}`);
	},
});

const upload = multer({ storage: storage });

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/alladdress", authMiddleware, getAllAddress);
userRouter.post("/address/add", authMiddleware, addAddress);
userRouter.post("/address/remove", authMiddleware, removeAddress);
userRouter.get("/address/:id", authMiddleware, getAddressById);
userRouter.get("/center/:id", authMiddleware, getCenterById);
userRouter.get("/allcenter", authMiddleware, getAllCenters);
userRouter.post("/submit/details", authMiddleware, upload.single("image"), createSubmission);
userRouter.get("/submissions", authMiddleware, getUserSubmissions);

export default userRouter;
