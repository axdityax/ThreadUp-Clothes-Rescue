import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import adminRouter from "./routes/adminRoute.js";

// app config
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(express.json()); // whenever we get request from frontend to backend it will parse using json
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/admin/", adminRouter);

// app.use("/images", express.static("uploads")); // We have mount this folder at this endpoint
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
	res.send("API Working");
});

app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}`);
});
