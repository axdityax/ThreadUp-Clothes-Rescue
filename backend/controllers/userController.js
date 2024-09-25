import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Login user
const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		// Check if the user exists
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(401).json({ success: false, message: "Invalid credentials" });
		}

		// Check if password matches
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ success: false, message: "Invalid credentials" });
		}

		// Create and send token
		const token = createToken(user._id);
		res.status(200).json({ success: true, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// Register user
const registerUser = async (req, res) => {
	const { name, password, email } = req.body;

	try {
		// Validate user input
		if (!name || !password || !email) {
			return res.status(400).json({ success: false, message: "Please fill in all fields" });
		}

		// Check if user already exists
		const exists = await userModel.findOne({ email });
		if (exists) {
			return res.status(400).json({ success: false, message: "User already exists" });
		}

		// Validate email and password
		if (!validator.isEmail(email)) {
			return res.status(400).json({ success: false, message: "Invalid email format" });
		}
		if (password.length < 8) {
			return res
				.status(400)
				.json({ success: false, message: "Password must be at least 8 characters long" });
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user
		const newUser = new userModel({
			name,
			email,
			password: hashedPassword,
		});

		// Save user and create token
		const user = await newUser.save();
		const token = createToken(user._id);

		// Respond with token
		res.status(201).json({ success: true, token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

export { registerUser, loginUser };
