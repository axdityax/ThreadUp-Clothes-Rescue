import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		submittedItems: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Submission",
			},
		],
		addresses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Address",
			},
		],
	},
	{ timestamps: true }
);

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
