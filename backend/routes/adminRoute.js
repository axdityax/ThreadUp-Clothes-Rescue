import express from "express";
import authMiddleware from "../middleware/auth.js";
import { createCenter, deleteCenter, getAllCenters } from "../controllers/centerController.js";

const adminRouter = express.Router();

// Admin panel routes (authentication required)
// router.get("/users", authMiddleware, getAllUsers);
// router.get("/submissions", authMiddleware, getAllSubmissions);
// router.put("/submissions/:id", authMiddleware, updateSubmissionStatus);
// router.delete("/submissions/:id", authMiddleware, deleteSubmission);
adminRouter.post("/center/add", createCenter);
adminRouter.post("/center/remove", deleteCenter);
adminRouter.get("/allcenter", getAllCenters);
export default adminRouter;
