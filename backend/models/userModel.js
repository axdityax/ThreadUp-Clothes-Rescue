import mongoose from "mongoose";

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
		// A user can have many addresses, but they are not required at the time of login
		addresses: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Address",
			},
		],
	},
	{ timestamps: true }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);

export default userModel;
