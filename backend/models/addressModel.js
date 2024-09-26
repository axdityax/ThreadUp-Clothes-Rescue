import mongoose from "mongoose";
// Address Schema
const addressSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		street: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		state: {
			type: String,
			required: true,
		},
		postalCode: {
			type: String,
			required: true,
		},
		country: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const addressModel = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default addressModel;
