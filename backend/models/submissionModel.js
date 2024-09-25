import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		apparelType: {
			type: String,
			required: true,
		},
		condition: {
			type: String,
			required: true,
			enum: ["Good for donation", "Needs recycling", "For disposal only"],
		},
		preferredAction: {
			type: String,
			required: true,
			enum: ["Donate", "Recycle", "Dispose"],
		},
		submissionStatus: {
			type: String,
			required: true,
			enum: ["Submitted", "Processing", "Completed"],
			default: "Submitted",
		},
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Address",
			required: true,
		},
		center: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Center", // Reference to the Center model
			required: true,
		},
		image: {
			type: String, // Store image URL or file path
			required: true,
		},
		submissionDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ timestamps: true }
);

const submissionModel =
	mongoose.models.submission || mongoose.model("submission", submissionSchema);

export default submissionModel;
