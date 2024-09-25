import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
	{
		submissionId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "submission",
			required: true,
		},
		status: {
			type: String,
			enum: ["Submitted", "Processing", "Completed", "On Hold", "Canceled"],
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		updatedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const trackModel = mongoose.models.Track || mongoose.model("Track", trackSchema);

export default trackModel;
