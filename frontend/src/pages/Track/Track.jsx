import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./Track.css";
import { StoreContext } from "../../context/StoreContext";

const Track = () => {
	const [submissions, setSubmissions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortCriteria, setSortCriteria] = useState("date"); // Default sort by date
	const token = localStorage.getItem("token"); // Retrieve the token from localStorage
	const { url } = useContext(StoreContext);

	useEffect(() => {
		const fetchSubmissions = async () => {
			try {
				const response = await axios.get(`${url}/api/user/track`, {
					headers: {
						token,
					},
				});
				const updatedSubmissions = response.data.data.map((submission) => ({
					...submission,
					image: submission.image.replace(/\\/g, "/"), // Ensure the image URL is correct
				}));
				setSubmissions(updatedSubmissions);
			} catch (err) {
				setError("Failed to fetch submissions");
			} finally {
				setLoading(false);
			}
		};

		fetchSubmissions();
	}, [token, url]);

	// Handle sorting submissions based on selected criteria
	const sortSubmissions = (submissions) => {
		const sortedSubmissions = [...submissions]; // Create a copy to avoid mutating original
		return sortedSubmissions.sort((a, b) => {
			if (sortCriteria === "date") {
				return new Date(b.submissionDate) - new Date(a.submissionDate); // Latest date first
			} else if (sortCriteria === "processing") {
				return a.submissionStatus === "Processing" ? -1 : 1; // Processing first
			} else if (sortCriteria === "completed") {
				return a.submissionStatus === "Completed" ? -1 : 1; // Completed first
			}
			return 0; // Fallback in case no sorting criteria matches
		});
	};

	// Filter submissions based on search query
	const filteredSubmissions = submissions.filter((submission) =>
		submission.apparelType.toLowerCase().includes(searchQuery.toLowerCase())
	);

	if (loading) return <p>Loading submissions...</p>;
	if (error) return <p>{error}</p>;

	return (
		<div className='track-container'>
			<h2>Your Apparel Submissions</h2>

			<div className='sorting-track'>
				<div className='search-input'>
					<input
						type='text'
						placeholder='Search by apparel type...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
				<div className='sorting-select'>
					<select onChange={(e) => setSortCriteria(e.target.value)} value={sortCriteria}>
						<option value='date'>Sort by Date</option>
						<option value='processing'>Sort by Processing</option>
						<option value='completed'>Sort by Completed</option>
					</select>
				</div>
			</div>

			{submissions.length === 0 ? (
				<p>No submissions found.</p>
			) : (
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
									<strong>Apparel Type:</strong> {submission.apparelType}
								</p>
								<p>
									<strong>Condition:</strong> {submission.condition}
								</p>
								<p>
									<strong>Preferred Action:</strong> {submission.preferredAction}
								</p>
								<p>
									<strong>Status:</strong> {submission.submissionStatus}
								</p>
								<p>
									<strong>Location:</strong>{" "}
									{`${submission.location?.street}, ${submission.location?.city}, ${submission.location?.state} ${submission.location?.postalCode}, ${submission.location?.country}`}
								</p>
								<p>
									<strong>Center:</strong> {submission.center?.name}
								</p>
								<p>
									<strong>Submission Date:</strong>{" "}
									{new Date(submission.submissionDate).toLocaleDateString()}
								</p>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Track;
