import submissionModel from "../models/submissionModel.js";
import userModel from "../models/userModel.js";

// Controller for creating a new submission
const createSubmission = async (req, res) => {
	try {
		const { address, apparelType, condition, preferredAction, selectedCenter } = req.body;
		const image = req.file ? req.file.path : null; // Handle image upload

		// Create new submission
		const submission = new submissionModel({
			userId: req.user._id, // Assuming req.user is populated by auth middleware
			location: address, // Use address ID if needed
			apparelType,
			condition,
			preferredAction,
			center: selectedCenter, // Center ID
			image,
		});

		// Save the submission to the database
		await submission.save();

		// Add the submission ID to the user's submittedItems array
		await userModel.findByIdAndUpdate(
			req.user._id, // User ID from the request
			{ $push: { submittedItems: submission._id } }, // Push the new submission ID to submittedItems
			{ new: true } // Optional: return the updated user document
		);

		return res.status(201).json({
			message: "Submission created successfully",
			data: submission,
		});
	} catch (error) {
		console.error("Error creating submission:", error);
		return res.status(500).json({ message: "Failed to create submission. Please try again." });
	}
};

const getUserSubmissions = async (req, res) => {
	try {
		// Fetch submissions and populate the user, submittedItems, addresses, location, and center
		const submissions = await submissionModel
			.find({ userId: req.user._id })
			.populate({
				path: "userId",
				select: "name email", // Select only required user fields
				populate: [
					{ path: "submittedItems" }, // Populate submittedItems
					{ path: "addresses" }, // Populate addresses
				],
			})
			.populate("location") // Populate location (Address)
			.populate("center"); // Populate center (Center reference)

		return res.status(200).json({ data: submissions });
	} catch (error) {
		console.error("Error fetching user submissions:", error);
		return res.status(500).json({ error: error.message });
	}
};

// Controller to get a single submission by its ID
const getSubmissionById = async (req, res) => {
	try {
		const submission = await submissionModel.findById(req.params.id);

		if (!submission) {
			return res.status(404).json({ message: "Submission not found" });
		}

		return res.status(200).json({ data: submission });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// Controller to update a submission (e.g., changing submissionStatus)
const updateSubmissionStatus = async (req, res) => {
	try {
		const { submissionId, status } = req.body;

		// Check if all required fields are provided
		if (!submissionId || !status) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}

		// Validate the status value
		const validStatuses = ["Submitted", "Processing", "Completed"];
		if (!validStatuses.includes(status)) {
			return res.status(400).json({ success: false, message: "Invalid status value" });
		}

		// Find the submission by ID and update the status
		const updatedSubmission = await submissionModel.findByIdAndUpdate(
			submissionId,
			{ submissionStatus: status },
			{ new: true }
		);

		// If submission is not found, return error
		if (!updatedSubmission) {
			return res.status(404).json({ success: false, message: "Submission not found" });
		}

		// Send a success response with the updated submission
		res.status(200).json({
			success: true,
			message: "Submission status updated successfully",
			data: updatedSubmission,
		});
	} catch (error) {
		console.error("Error updating submission status:", error);
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
};

// Controller to delete a submission by its ID
const deleteSubmission = async (req, res) => {
	try {
		const submission = await submissionModel.findByIdAndDelete(req.params.id);

		if (!submission) {
			return res.status(404).json({ message: "Submission not found" });
		}

		return res.status(200).json({ message: "Submission deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

const getAllSubmissions = async (req, res) => {
	try {
		// Fetch all submissions, populating user and location details
		const submissions = await submissionModel
			.find({})
			.populate("userId", "name email") // Populate user name and email
			.populate("location") // Populate address details
			.populate("center"); // Populate center details (if necessary)

		// Send submissions data as a response
		res.status(200).json(submissions);
	} catch (error) {
		// Handle errors
		res.status(500).json({ message: "Error fetching submissions", error });
	}
};

// Backend - Fetch all user submissions
const getAllUserSubmissions = async (req, res) => {
	try {
		// Assuming user authentication middleware sets req.user with authenticated user's data
		const userId = req.user._id;

		// Fetch all submissions associated with the current user
		const submissions = await submissionModel
			.find({ userId }) // Find all submissions for the current user
			.populate("location", "street city state postalCode country") // Populate address/location details
			.populate("center", "name address") // Populate center name and address
			.exec();

		// Respond with the fetched submissions
		res.status(200).json({
			success: true,
			data: submissions,
		});
	} catch (error) {
		// Log the error for debugging
		console.error("Error fetching submissions:", error);

		// Respond with error message and status code 500
		res.status(500).json({
			success: false,
			message: "Failed to fetch submissions",
		});
	}
};

export {
	deleteSubmission,
	updateSubmissionStatus,
	getSubmissionById,
	getUserSubmissions,
	createSubmission,
	getAllSubmissions,
	getAllUserSubmissions,
};
