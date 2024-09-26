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
			},
			email: {
				type: String,
			},
		},
		workingHours: {
			type: String,
		},
	},
	{ timestamps: true }
);

const centerModel = mongoose.models.Center || mongoose.model("Center", centerSchema);

export default centerModel;
