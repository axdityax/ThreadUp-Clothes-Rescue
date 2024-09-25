import express from "express";
import {
	getAllCenters,
	getCenterById,
	createCenter,
	updateCenter,
	deleteCenter,
} from "../controllers/centerController.js"; // Adjust the path if necessary

const centerRouter = express.Router();

// Get all centers
centerRouter.get("/", getAllCenters);

// Get center by ID
centerRouter.get("/:id", getCenterById);

// Create a new center
centerRouter.post("/", createCenter);

// Update center details
centerRouter.put("/:id", updateCenter);

// Delete a center
centerRouter.delete("/:id", deleteCenter);

export default centerRouter;
