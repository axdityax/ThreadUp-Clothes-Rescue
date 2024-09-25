import express from "express";
import {
	createSubmission,
	getUserSubmissions,
	getSubmissionById,
	updateSubmission,
	deleteSubmission,
} from "../controllers/submissionController.js";
import { isAuthenticated } from "../middleware/auth.js"; // Middleware to verify user authentication

const submissionRouter = express.Router();

submissionRouter.post("/", isAuthenticated, createSubmission);

submissionRouter.get("/", isAuthenticated, getUserSubmissions);

submissionRouter.get("/:id", isAuthenticated, getSubmissionById);

submissionRouter.put("/:id", isAuthenticated, updateSubmission);

submissionRouter.delete("/:id", isAuthenticated, deleteSubmission);

export default submissionRouter;
