import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import "./Step1.css"; // Ensure this CSS file includes the necessary styles

const Step1 = ({ handleChange, formData, nextStep }) => {
	const navigate = useNavigate();
	const { url } = useContext(StoreContext);
	const [loading, setLoading] = useState(false);
	const [addresses, setAddresses] = useState([]);

	const fetchAddresses = async () => {
		setLoading(true);
		try {
			const token = localStorage.getItem("token");
			const config = {
				headers: { token },
			};

			const response = await axios.get(`${url}/api/user/alladdress`, config);
			if (response.data && response.data.success) {
				setAddresses(response.data.data);
			} else {
				toast.error(response.data.message || "Failed to fetch addresses.");
			}
		} catch (error) {
			console.error("Error fetching addresses:", error);
			toast.error("An error occurred while fetching addresses.");
		} finally {
			setLoading(false);
		}
	};

	const removeAddress = async (addressId) => {
		try {
			const token = localStorage.getItem("token");
			const config = {
				headers: { token },
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

	return (
		<div className='step1-container'>
			<h2>Select Address</h2>
			{loading ? (
				<p>Loading addresses...</p>
			) : (
				<table className='address-table'>
					<thead>
						<tr>
							<th>Select</th>
							<th>Address</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{addresses.length > 0 ? (
							addresses.map((address) => (
								<tr key={address._id}>
									<td>
										<input
											type='radio'
											id={address._id}
											name='address'
											value={address._id}
											checked={formData.address === address._id}
											onChange={handleChange}
										/>
									</td>
									<td>
										{`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}`}
									</td>
									<td>
										<button
											className='remove-address-button'
											onClick={(e) => {
												e.stopPropagation();
												e.preventDefault();
												removeAddress(address._id);
											}}>
											X
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan='3' className='no-data'>
									No addresses available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			)}
			<div className='button-group'>
				<button className='add-address-button' onClick={() => navigate("/address/add")}>
					Add Address
				</button>
				<button className='next-button' disabled={!formData.address} onClick={nextStep}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Step1;
