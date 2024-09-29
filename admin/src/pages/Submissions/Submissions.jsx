import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // To show notifications
import "./Submissions.css"; // Import CSS for styling
import { StoreContext } from "../../context/StoreContext";

const Submissions = () => {
	const [submissions, setSubmissions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortCriteria, setSortCriteria] = useState("date"); // Default sort by date

	const { url } = useContext(StoreContext);

	// Fetch submissions from the backend
	const fetchSubmissions = async () => {
		setLoading(true); // Set loading state
		try {
			const response = await axios.get(`${url}/api/admin/submissions/all`);
			const updatedSubmissions = response.data.map((submission) => ({
				...submission,
				image: submission.image.replace(/\\/g, "/"), // Replace backslash with forward slash
			}));
			setSubmissions(updatedSubmissions);
			setLoading(false);
		} catch (error) {
			setError("Error fetching submissions");
			setLoading(false);
			toast.error("Network Error"); // Show error toast
		}
	};

	useEffect(() => {
		fetchSubmissions(); // Initial fetch
	}, [url]);

	const statusHandler = async (event, submissionId) => {
		try {
			const response = await axios.post(`${url}/api/admin/submissions/status`, {
				submissionId,
				status: event.target.value,
			});
			if (response.data.success) {
				await fetchSubmissions(); // Re-fetch submissions after status update
				toast.success("Submission status updated successfully");
			} else {
				toast.error("Error updating status");
			}
		} catch (error) {
			toast.error("Network Error");
		}
	};

	// Handle sorting submissions based on selected criteria
	const sortSubmissions = (submissions) => {
		const sortedSubmissions = [...submissions]; // Create a copy to avoid mutating original
		return sortedSubmissions.sort((a, b) => {
			if (sortCriteria === "date") {
				return new Date(b.submissionDate) - new Date(a.submissionDate); // Latest date first
			} else if (sortCriteria === "processing") {
				return a.submissionStatus === "Processing" ? -1 : 1; // Processing first
			} else if (sortCriteria === "submitted") {
				return a.submissionStatus === "Submitted" ? -1 : 1; // Submitted first
			} else if (sortCriteria === "completed") {
				return a.submissionStatus === "Completed" ? -1 : 1; // Completed first
			}
			return 0; // Fallback in case no sorting criteria matches
		});
	};

	// Filter submissions based on search query
	const filteredSubmissions = submissions.filter((submission) =>
		submission.userId.name.toLowerCase().includes(searchQuery.toLowerCase())
	);

	if (loading) return <p>Loading submissions...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className='submissions-container'>
			<h1>All Submissions</h1>
			<div className='sorting-submissions'>
				<div className='sorting-input'>
					<input
						type='text'
						placeholder='Search by user...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className='sorting-select'>
					<select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
						<option value='date'>Sort by Date</option>
						<option value='processing'>Sort by Processing</option>
						<option value='submitted'>Sort by Submitted</option>
						<option value='completed'>Sort by Completed</option>
					</select>
				</div>
			</div>

			<div className='submission-list'>
				{sortSubmissions(filteredSubmissions).map((submission) => (
					<div key={submission._id} className='submission-item'>
						<img
							src={`${url}/` + submission.image} // Dynamically construct the image URL
							alt={submission.apparelType}
							className='submission-image'
						/>
						<div className='submission-details'>
							<p>
								<strong>User:</strong> {submission.userId.name} (
								{submission.userId.email})
							</p>
							<p>
								<strong>Apparel Type:</strong> {submission.apparelType}
							</p>
							<p>
								<strong>Condition:</strong> {submission.condition}
							</p>
							<p>
								<strong>Preferred Action:</strong> {submission.preferredAction}
							</p>
							<p>
								<strong>Location:</strong> {submission.location.street},{" "}
								{submission.location.city}
							</p>
							<p>
								<strong>Submission Date:</strong>{" "}
								{new Date(submission.submissionDate).toLocaleDateString()}
							</p>
						</div>
						<div className='submission-status'>
							<p>
								<strong>Status:</strong>
							</p>
							<select
								onChange={(event) => statusHandler(event, submission._id)}
								value={submission.submissionStatus}>
								<option value='Submitted'>Submitted</option>
								<option value='Processing'>Processing</option>
								<option value='Completed'>Completed</option>
							</select>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Submissions;
