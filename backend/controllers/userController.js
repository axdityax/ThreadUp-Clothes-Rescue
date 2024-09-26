import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import addressModel from "../models/addressModel.js";
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

const addAddress = async (req, res) => {
	const { street, city, state, postalCode, country, phoneNumber } = req.body;
	const userId = req.user.id;

	try {
		// Validate user input
		if (!street || !city || !state || !postalCode || !country || !phoneNumber) {
			return res.status(400).json({ success: false, message: "Please fill in all fields" });
		}

		// Optional: Check if the address already exists
		const existingAddress = await addressModel.findOne({
			user: userId,
			street,
			city,
			state,
			postalCode,
			country,
		});
		if (existingAddress) {
			return res.status(409).json({ success: false, message: "Address already exists" });
		}

		// Create new address
		const newAddress = new addressModel({
			user: userId,
			street,
			city,
			state,
			postalCode,
			country,
			phoneNumber, // Corrected from phone to phoneNumber
		});

		// Save the address to the database
		const savedAddress = await newAddress.save();

		// Return success response with the saved address
		res.status(201).json({ success: true, data: savedAddress });
	} catch (error) {
		console.error("Error adding address:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

const removeAddress = async (req, res) => {
	const userId = req.user.id; // Get the authenticated user's ID
	const { id } = req.body; // Get the address ID from the request body

	try {
		// Find the address by ID and check if it belongs to the user
		const address = await addressModel.findOne({ _id: id, user: userId });

		if (!address) {
			return res.status(404).json({
				success: false,
				message: "Address not found or does not belong to the user",
			});
		}

		// Remove the address
		await addressModel.findByIdAndDelete(id);

		return res.status(200).json({
			success: true,
			message: "Address removed successfully",
		});
	} catch (error) {
		console.error("Error removing address:", error);
		return res.status(500).json({
			success: false,
			message: "An error occurred while removing the address",
		});
	}
};

const getAllAddress = async (req, res) => {
	const userId = req.user.id;

	try {
		const addresses = await addressModel.find({ user: userId });
		res.status(200).json({ success: true, data: addresses });
	} catch (error) {
		console.error("Error fetching addresses:", error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

const getAddressById = async (req, res) => {
	const userId = req.user.id; // Get the ID of the authenticated user
	const { id } = req.params; // Get the address ID from the request parameters

	try {
		// Find the address by ID and ensure it belongs to the authenticated user
		const address = await addressModel.findOne({ _id: id, user: userId });

		if (!address) {
			return res.status(404).json({
				success: false,
				message: "Address not found or does not belong to the user",
			});
		}

		res.status(200).json({
			success: true,
			data: address,
		});
	} catch (error) {
		console.error("Error fetching address:", error);
		res.status(500).json({
			success: false,
			message: "Error fetching address",
		});
	}
};

export { registerUser, loginUser, getAllAddress, addAddress, removeAddress, getAddressById };
