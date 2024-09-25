import jwt from "jsonwebtoken";
import User from "../models/userModel.js"; // Assuming you have a User model

const authMiddleware = async (req, res, next) => {
	const { token } = req.headers;

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Not authorized. Please login again.",
		});
	}

	try {
		// Verify the token and find the user
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findById(decodedToken.id).select("-password");

		if (!req.user) {
			return res.status(404).json({
				success: false,
				message: "User not found. Please login again.",
			});
		}
		next();
	} catch (error) {
		console.error("Token verification error:", error);
		return res.status(401).json({
			success: false,
			message: "Token invalid or expired. Please login again.",
		});
	}
};

export default authMiddleware;
