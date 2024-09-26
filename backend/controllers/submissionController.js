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
const updateSubmission = async (req, res) => {
	try {
		const submission = await submissionModel.findByIdAndUpdate(
			req.params.id,
			{ ...req.body },
			{ new: true }
		);

		if (!submission) {
			return res.status(404).json({ message: "Submission not found" });
		}

		return res.status(200).json({
			message: "Submission updated successfully",
			data: submission,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
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

export {
	deleteSubmission,
	updateSubmission,
	getSubmissionById,
	getUserSubmissions,
	createSubmission,
};
