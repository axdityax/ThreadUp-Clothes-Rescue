import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import "./AddCenter.css"; // Import CSS for styling

const AddCenter = () => {
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [workingHours, setWorkingHours] = useState("");
	const [latitude, setLatitude] = useState("");
	const [longitude, setLongitude] = useState("");
	const { url } = useContext(StoreContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const response = await axios.post(`${url}/api/admin/center/add`, {
				name,
				type,
				location: {
					address,
					coordinates: {
						lat: parseFloat(latitude),
						lng: parseFloat(longitude),
					},
				},
				contactInfo: { phone, email },
				workingHours,
			});

			if (response.data.success) {
				alert("Center added successfully!");
				navigate("/center"); // Redirect to the center list
			} else {
				setError(response.data.message || "Failed to add center.");
			}
		} catch (error) {
			console.error("Error adding center:", error);
			setError("An error occurred while adding the center.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='add-center'>
			<h1>Add Center</h1>
			<form onSubmit={handleSubmit} className='center-form'>
				<div className='form-group'>
					<label htmlFor='name'>
						<b>Center Name:</b>
					</label>
					<input
						type='text'
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						placeholder='Enter center name'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='type'>
						<b>Type:</b>
					</label>
					<select
						id='type'
						value={type}
						onChange={(e) => setType(e.target.value)}
						required>
						<option value='' disabled>
							Select Type
						</option>
						<option value='Donation'>Donation</option>
						<option value='Recycling'>Recycling</option>
					</select>
				</div>

				<div className='form-group'>
					<label htmlFor='address'>
						<b>Address:</b>
					</label>
					<input
						type='text'
						id='address'
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						required
						placeholder='Enter address'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='phone'>
						<b>Phone:</b>
					</label>
					<input
						type='text'
						id='phone'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						placeholder='Enter phone number'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='email'>
						<b>Email:</b>
					</label>
					<input
						type='email'
						id='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter email address'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='workingHours'>
						<b>Working Hours:</b>
					</label>
					<input
						type='text'
						id='workingHours'
						value={workingHours}
						onChange={(e) => setWorkingHours(e.target.value)}
						placeholder='Enter working hours'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='latitude'>
						<b>Latitude:</b>
					</label>
					<input
						type='number'
						id='latitude'
						value={latitude}
						onChange={(e) => setLatitude(e.target.value)}
						required
						placeholder='Enter latitude'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='longitude'>
						<b>Longitude:</b>
					</label>
					<input
						type='number'
						id='longitude'
						value={longitude}
						onChange={(e) => setLongitude(e.target.value)}
						required
						placeholder='Enter longitude'
					/>
				</div>

				<button type='submit' className='submit-button' disabled={loading}>
					{loading ? "Adding..." : "Add Center"}
				</button>

				{error && <p className='error-message'>{error}</p>}
			</form>
		</div>
	);
};

export default AddCenter;
