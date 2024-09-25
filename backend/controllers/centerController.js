import centerModel from "../models/centerModel.js";

// Get all centers
export const getAllCenters = async (req, res) => {
	try {
		const centers = await centerModel.find();
		res.status(200).json({
			success: true,
			data: centers,
		});
	} catch (error) {
		console.error("Error fetching centers:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching centers",
		});
	}
};

// Get center by ID
export const getCenterById = async (req, res) => {
	try {
		const center = await centerModel.findById(req.params.id);
		if (!center) {
			return res.status(404).json({
				success: false,
				message: "Center not found",
			});
		}
		res.status(200).json({
			success: true,
			data: center,
		});
	} catch (error) {
		console.error("Error fetching center:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching center",
		});
	}
};

// Create a new center
export const createCenter = async (req, res) => {
	try {
		const newCenter = new centerModel(req.body);
		const savedCenter = await newCenter.save();
		res.status(201).json({
			success: true,
			data: savedCenter,
		});
	} catch (error) {
		console.error("Error creating center:", error);
		res.status(500).json({
			success: false,
			message: "Error creating center",
		});
	}
};

// Update center details
export const updateCenter = async (req, res) => {
	try {
		const updatedCenter = await centerModel.findByIdAndUpdate(
			req.params.id,
			{ $set: req.body },
			{ new: true }
		);
		if (!updatedCenter) {
			return res.status(404).json({
				success: false,
				message: "Center not found",
			});
		}
		res.status(200).json({
			success: true,
			data: updatedCenter,
		});
	} catch (error) {
		console.error("Error updating center:", error);
		res.status(500).json({
			success: false,
			message: "Error updating center",
		});
	}
};

// Delete a center
export const deleteCenter = async (req, res) => {
	try {
		// Get the center ID from the request body
		const { id } = req.body;
		const deletedCenter = await centerModel.findByIdAndDelete(id); // Use id from body
		if (!deletedCenter) {
			return res.status(404).json({
				success: false,
				message: "Center not found",
			});
		}
		res.status(200).json({
			success: true,
			message: "Center deleted successfully",
		});
	} catch (error) {
		console.error("Error deleting center:", error);
		res.status(500).json({
			success: false,
			message: "Error deleting center",
		});
	}
};
