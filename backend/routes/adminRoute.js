import express from "express";
import authMiddleware from "../middleware/auth.js";
import { createCenter, deleteCenter, getAllCenters } from "../controllers/centerController.js";
import { getAllUsers, deleteUser, getOneUser } from "../controllers/userController.js";
import { getAllSubmissions } from "../controllers/submissionController.js";

const adminRouter = express.Router();

// Admin panel routes (authentication required)
adminRouter.get("/allusers", getAllUsers);
adminRouter.post("/users/oneuser", getOneUser);
adminRouter.post("/users/delete/:id", deleteUser);

adminRouter.get("/submissions/all", getAllSubmissions);
// router.put("/submissions/:id", authMiddleware, updateSubmissionStatus);
// router.delete("/submissions/:id", authMiddleware, deleteSubmission);
adminRouter.post("/center/add", createCenter);
adminRouter.post("/center/remove", deleteCenter);
adminRouter.get("/allcenter", getAllCenters);
export default adminRouter;
