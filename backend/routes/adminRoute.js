import express from "express";
import authMiddleware from "../middleware/auth.js";
import { createCenter, deleteCenter, getAllCenters } from "../controllers/centerController.js";
import { getAllUsers, deleteUser, getOneUser } from "../controllers/userController.js";
import { getAllSubmissions, updateSubmissionStatus } from "../controllers/submissionController.js";
import {
	getCenterStats,
	getSubmissionStats,
	getUserStats,
} from "../controllers/statsController.js";

const adminRouter = express.Router();

adminRouter.get("/allusers", getAllUsers);
adminRouter.post("/users/oneuser", getOneUser);
adminRouter.post("/users/delete/:id", deleteUser);
adminRouter.get("/submissions/all", getAllSubmissions);
adminRouter.post("/submissions/status", updateSubmissionStatus);

adminRouter.post("/center/add", createCenter);
adminRouter.post("/center/remove", deleteCenter);
adminRouter.get("/allcenter", getAllCenters);

adminRouter.get("/center/stats", getCenterStats);
adminRouter.get("/submission/stats", getSubmissionStats);
adminRouter.get("/user/stats", getUserStats);
export default adminRouter;
