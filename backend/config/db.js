import mongoose from "mongoose";

export const connectDB = async () => {
	await mongoose
		.connect("mongodb+srv://axdityap25:axdityap25@cluster0.84m9c.mongodb.net/ThreadUp")
		.then(() => {
			console.log("DB Connected");
		})
		.catch((error) => {
			console.error("DB Connection Error:", error);
		});
};
