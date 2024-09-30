import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url"; // Required for ES module __dirname workaround
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import adminRouter from "./routes/adminRoute.js";

// __dirname fix for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express();
const port = process.env.PORT || 4000;

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
	res.send("API Working");
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}`);
});
