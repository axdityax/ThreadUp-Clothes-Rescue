import express from "express";
import {
	addTrackEvent,
	getTrackEvents,
	updateTrackEvent,
	deleteTrackEvent,
} from "../controllers/trackController.js";
import { isAuthenticated } from "../middleware/auth.js";

const trackRouter = express.Router();

// Add a new tracking event (admin only or authenticated users)
trackRouter.post("/", isAuthenticated, addTrackEvent);

// Get all tracking events for a submission (authenticated users)
trackRouter.get("/:submissionId", isAuthenticated, getTrackEvents);

// Update a tracking event by its ID (admin only or authenticated users)
trackRouter.put("/:id", isAuthenticated, updateTrackEvent);

// Delete a tracking event by its ID (admin only)
trackRouter.delete("/:id", isAuthenticated, deleteTrackEvent);

export default trackRouter;
