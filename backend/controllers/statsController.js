import userModel from "../models/userModel.js";
import submissionModel from "../models/submissionModel.js";
import centerModel from "../models/centerModel.js";
// Controller to get user stats
const getUserStats = async (req, res) => {
	try {
		// Get total users
		const totalUsers = await userModel.countDocuments();

		// Assuming "active" users are those who have submitted items
		const activeUsers = await userModel.countDocuments({
			submittedItems: { $exists: true, $ne: [] },
		});

		// Inactive users are those who have not submitted any items
		const inactiveUsers = totalUsers - activeUsers;

		// Send the response
		res.status(200).json({
			total: totalUsers,
			active: activeUsers,
			inactive: inactiveUsers,
		});
	} catch (error) {
		console.error("Error fetching user stats:", error);
		res.status(500).json({ message: "Server Error" });
	}
};

const getSubmissionStats = async (req, res) => {
	try {
		// Count submissions by preferredAction
		const recycleCount = await submissionModel.countDocuments({ preferredAction: "Recycle" });
		const donateCount = await submissionModel.countDocuments({ preferredAction: "Donate" });
		const disposeCount = await submissionModel.countDocuments({ preferredAction: "Dispose" });

		// Group submissions by month for the trend data
		const trendData = await submissionModel.aggregate([
			{
				$group: {
					_id: { $month: "$submissionDate" },
					count: { $sum: 1 },
				},
			},
			{ $sort: { _id: 1 } }, // Sort by month
		]);

		// Create trend labels for the months (e.g., "January", "February", etc.)
		const trendLabels = trendData.map((data) => {
			const month = new Date(0, data._id - 1).toLocaleString("default", { month: "long" });
			return month;
		});

		// Extract the count of submissions for each month
		const trendCounts = trendData.map((data) => data.count);

		// Send the response
		res.status(200).json({
			recycle: recycleCount,
			donate: donateCount,
			dispose: disposeCount,
			trendLabels: trendLabels,
			trendData: trendCounts,
		});
	} catch (error) {
		console.error("Error fetching submission stats:", error);
		res.status(500).json({ message: "Server Error" });
	}
};

const getCenterStats = async (req, res) => {
	try {
		// Find all centers
		const centers = await centerModel.find();

		// Map the centers to return the required fields
		const centerStats = centers.map((center) => {
			return {
				name: center.name,
				latitude: center.location.coordinates.lat,
				longitude: center.location.coordinates.lng,
				// Assuming that capacity utilization is derived/calculated elsewhere and stored in the model
				capacityUtilization: Math.random().toFixed(2), // Replace this with actual capacity logic if stored
			};
		});

		// Send the response
		res.status(200).json(centerStats);
	} catch (error) {
		console.error("Error fetching center stats:", error);
		res.status(500).json({ message: "Server Error" });
	}
};

export { getUserStats, getSubmissionStats, getCenterStats };
