import submissionModel from "../models/submissionModel.js";

// Controller for creating a new submission
const createSubmission = async (req, res) => {
	try {
		const submission = new submissionModel({
			...req.body,
			userId: req.user._id, // Assuming req.user is populated with authenticated user's data
		});

		await submission.save();
		return res.status(201).json({
			message: "Submission created successfully",
			data: submission,
		});
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// Controller to get all submissions for a user
const getUserSubmissions = async (req, res) => {
	try {
		const submissions = await submissionModel.find({ userId: req.user._id });
		return res.status(200).json({ data: submissions });
	} catch (error) {
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
