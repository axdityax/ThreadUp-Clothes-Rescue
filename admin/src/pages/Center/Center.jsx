import React, { useContext, useEffect, useState } from "react";
import "./Center.css"; // Import CSS for styling
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Center = () => {
	const [centers, setCenters] = useState([]);
	const { url } = useContext(StoreContext);
	const navigate = useNavigate();

	const fetchAllCenters = async () => {
		try {
			const response = await axios.get(`${url}/api/admin/allcenter`);
			if (response.data.success) {
				setCenters(response.data.data);
			} else {
				console.error("Failed to fetch centers: ", response.data.message);
			}
		} catch (error) {
			console.error("Error fetching centers:", error);
		}
	};

	const removeCenter = async (centerId) => {
		try {
			const response = await axios.post(`${url}/api/admin/center/remove`, { id: centerId });
			if (response.data.success) {
				toast.success("Center removed successfully!");
				fetchAllCenters();
			} else {
				toast.error("Failed to remove center.");
			}
		} catch (error) {
			console.error("Error removing center:", error);
			toast.error("An error occurred while removing the center.");
		}
	};

	useEffect(() => {
		fetchAllCenters();
	}, []);

	return (
		<div className='admin-center'>
			<h1>Centers</h1>
			<button onClick={() => navigate("/center/add")}>Add Center</button>

			<table className='center-table'>
				<thead>
					<tr>
						<th>Center Name</th>
						<th>Type</th>
						<th>Address</th>
						<th>Phone</th>
						<th>Email</th>
						<th>Working Hours</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{centers.length > 0 ? (
						centers.map((center) => (
							<tr key={center._id}>
								<td>{center.name}</td>
								<td>{center.type}</td>
								<td>{center.location.address}</td>
								<td>{center.contactInfo.phone || "N/A"}</td>
								<td>{center.contactInfo.email || "N/A"}</td>
								<td>{center.workingHours || "N/A"}</td>
								<td>
									<p
										onClick={() => removeCenter(center._id)}
										className='delete-icon cursor'>
										X
									</p>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan='7' className='no-data'>
								No centers available
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

export default Center;
