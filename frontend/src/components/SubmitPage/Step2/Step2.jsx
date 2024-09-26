import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import "./Step2.css";
import { toast } from "react-toastify"; // Ensure toast is used correctly

const Step2 = ({ onNext, previousData }) => {
	const [addresses, setAddresses] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState("");
	const { url } = useContext(StoreContext);
	const navigate = useNavigate();

	const fetchAddresses = async () => {
		try {
			const token = localStorage.getItem("token");
			const config = {
				headers: { token }, // Pass token in Authorization header
			};

			// Fetch user addresses
			const response = await axios.get(`${url}/api/user/alladdress`, config);
			if (response.data && response.data.success) {
				setAddresses(response.data.data);
			} else {
				console.error(
					"Error fetching addresses:",
					response.data.message || "Unknown error"
				);
			}
		} catch (error) {
			console.error("Error fetching addresses:", error);
		}
	};

	const removeAddress = async (addressId) => {
		try {
			const token = localStorage.getItem("token");
			const config = {
				headers: { token }, // Pass token in Authorization header
			};

			const response = await axios.post(
				`${url}/api/user/address/remove`,
				{ id: addressId },
				config
			);
			if (response.data.success) {
				toast.success("Address removed successfully!");
				fetchAddresses();
			} else {
				toast.error("Failed to remove address.");
			}
		} catch (error) {
			console.error("Error removing address:", error);
			toast.error("An error occurred while removing the address.");
		}
	};

	useEffect(() => {
		fetchAddresses();
	}, [url]);

	const handleNext = (event) => {
		event.preventDefault();
		if (!selectedAddress) {
			alert("Please select an address.");
			return;
		}
		onNext({ ...previousData, address: selectedAddress });
	};

	return (
		<div className='step2'>
			<h1>Select Address</h1>
			<button onClick={() => navigate("/address/add")}>Add Address</button>

			<table className='address-table'>
				<thead>
					<tr>
						<th>Select</th>
						<th>Street</th>
						<th>City</th>
						<th>State</th>
						<th>Postal Code</th>
						<th>Country</th>
						<th>Phone Number</th>
						<th>Action</th> {/* Added Action column */}
					</tr>
				</thead>
				<tbody>
					{addresses.length > 0 ? (
						addresses.map((address) => (
							<tr key={address._id}>
								<td>
									<input
										type='radio'
										name='selectedAddress'
										value={address._id}
										onChange={() => setSelectedAddress(address._id)}
									/>
								</td>
								<td>{address.street}</td>
								<td>{address.city}</td>
								<td>{address.state}</td>
								<td>{address.postalCode}</td>
								<td>{address.country}</td>
								<td>{address.phoneNumber}</td>
								<td>
									<p
										onClick={() => removeAddress(address._id)}
										className='delete-icon cursor'>
										X
									</p>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan='8' className='no-data'>
								{" "}
								{/* Change colSpan to 8 */}
								No addresses available
							</td>
						</tr>
					)}
				</tbody>
			</table>

			<button className='next-button' onClick={handleNext}>
				Next
			</button>
		</div>
	);
};

export default Step2;
