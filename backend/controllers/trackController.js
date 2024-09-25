import trackModel from "../models/trackModel.js";
import submissionModel from "../models/submissionModel.js";

// Controller to add a new tracking event for a submission
export const addTrackEvent = async (req, res) => {
	try {
		const { submissionId, status, message } = req.body;

		// Verify submission exists
		const submission = await submissionModel.findById(submissionId);
		if (!submission) {
			return res.status(404).json({ message: "Submission not found" });
		}

		// Create new tracking event
		const newTrack = new trackModel({
			submissionId,
			status,
			message,
		});

		await newTrack.save();

		// Optionally update submission status
		submission.submissionStatus = status;
		await submission.save();

		return res.status(201).json({ message: "Tracking event added", data: newTrack });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// Controller to get all tracking events for a submission
const getTrackEvents = async (req, res) => {
	try {
		const { submissionId } = req.params;

		// Fetch tracking events related to the submission
		const trackingEvents = await trackModel.find({ submissionId });

		if (!trackingEvents || trackingEvents.length === 0) {
			return res
				.status(404)
				.json({ message: "No tracking events found for this submission" });
		}

		return res.status(200).json({ data: trackingEvents });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// Controller to update a specific tracking event by its ID
const updateTrackEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const { status, message } = req.body;

		// Find and update the tracking event
		const updatedTrack = await trackModel.findByIdAndUpdate(
			id,
			{ status, message },
			{ new: true }
		);

		if (!updatedTrack) {
			return res.status(404).json({ message: "Tracking event not found" });
		}

		// Optionally update the related submission status
		const submission = await submissionModel.findById(updatedTrack.submissionId);
		if (submission) {
			submission.submissionStatus = status;
			await submission.save();
		}

		return res.status(200).json({ message: "Tracking event updated", data: updatedTrack });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

// Controller to delete a specific tracking event by its ID
const deleteTrackEvent = async (req, res) => {
	try {
		const { id } = req.params;

		// Find and delete the tracking event
		const deletedTrack = await trackModel.findByIdAndDelete(id);

		if (!deletedTrack) {
			return res.status(404).json({ message: "Tracking event not found" });
		}

		return res.status(200).json({ message: "Tracking event deleted successfully" });
	} catch (error) {
		return res.status(500).json({ error: error.message });
	}
};

export { deleteTrackEvent, updateTrackEvent, getTrackEvents, addTrackEvent };
