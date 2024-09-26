import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext"; // Ensure the correct path
import "./Step3.css";

const Step3 = ({ formData, handleChange, prevStep, nextStep }) => {
	const [centers, setCenters] = useState([]);
	const { url } = useContext(StoreContext); // Fetching URL from context

	// Function to fetch available centers
	const fetchCenters = async () => {
		try {
			const token = localStorage.getItem("token"); // Get the token from localStorage
			if (!token) {
				throw new Error("User is not authenticated");
			}

			const config = {
				headers: { token },
			};

			const response = await axios.get(`${url}/api/user/allcenter`, config); // API call to fetch centers
			console.log(response);
			if (response.data && response.data.success) {
				setCenters(response.data.data); // Set the centers to state
			} else {
				console.error("Error fetching centers:", response.data.message || "Unknown error");
			}
		} catch (error) {
			console.error("Error fetching centers:", error.message || "Unknown error");
		}
	};

	// Fetch centers on component mount
	useEffect(() => {
		fetchCenters();
	}, [url]);

	// Handle next step
	const handleNext = (event) => {
		event.preventDefault();
		if (!formData.selectedCenter) {
			alert("Please select a center.");
			return;
		}
		console.log(formData)
		nextStep(); // Proceed to the next step
	};

	return (
		<div className='step3-container'>
			<h2>Select Center</h2>
			<table className='center-table'>
				<thead>
					<tr>
						<th>Select</th>
						<th>Center Name</th>
						<th>Type</th>
						<th>Address</th>
						<th>Location</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Working Hours</th>
					</tr>
				</thead>
				<tbody>
					{centers.length > 0 ? (
						centers.map((center) => (
							<tr key={center._id}>
								<td>
									<input
										type='radio'
										name='selectedCenter'
										value={center._id}
										checked={formData.selectedCenter === center._id}
										onChange={() =>
											handleChange({
												target: {
													name: "selectedCenter",
													value: center._id,
												},
											})
										}
									/>
								</td>
								<td>{center.name}</td>
								<td>{center.type}</td>
								<td>{center.location.address}</td>
								<td>
									<a
										href={`https://www.google.com/maps?q=${center.location.coordinates.lat},${center.location.coordinates.lng}`}
										target='_blank'
										rel='noopener noreferrer'>
										Open on Map
									</a>
								</td>
								<td>{center.contactInfo?.phone || "N/A"}</td>
								<td>{center.contactInfo?.email || "N/A"}</td>
								<td>{center.workingHours || "N/A"}</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan='8' className='no-data'>
								No centers available
							</td>
						</tr>
					)}
				</tbody>
			</table>

			{/* Navigation Buttons */}
			<div className='navigation-buttons'>
				<button className='prev-button' onClick={prevStep}>
					Previous
				</button>
				<button
					className='next-button'
					onClick={handleNext}
					disabled={!formData.selectedCenter}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Step3;
