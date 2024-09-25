import mongoose from "mongoose";

const centerSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
			enum: ["Donation", "Recycling"],
		},
		location: {
			address: {
				type: String,
				required: true,
			},
			coordinates: {
				lat: {
					type: Number,
					required: true,
				},
				lng: {
					type: Number,
					required: true,
				},
			},
		},
		contactInfo: {
			phone: {
				type: String,
				required: false,
			},
			email: {
				type: String,
				required: false,
			},
		},
		workingHours: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);

const centerModel = mongoose.models.center || mongoose.model("center", centerSchema);

export default centerModel;
