import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../../context/StoreContext";
import "./AddAddress.css"; // Import CSS for styling

const AddAddress = () => {
	const [street, setStreet] = useState("");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [country, setCountry] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const { url } = useContext(StoreContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		try {
			const token = localStorage.getItem("token");
			const config = {
				headers: { token }, // Correct Authorization header
			};

			const response = await axios.post(
				`${url}/api/user/address/add`,
				{
					street,
					city,
					state,
					postalCode,
					country,
					phoneNumber,
				},
				config
			);

			if (response.data.success) {
				alert("Address added successfully!");
				navigate("/submit"); // Redirect to the address list
			} else {
				setError(response.data.message || "Failed to add address.");
			}
		} catch (error) {
			console.error("Error adding address:", error);
			setError("An error occurred while adding the address.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='add-address'>
			<h1>Add Address</h1>
			<form onSubmit={handleSubmit} className='address-form'>
				<div className='form-group'>
					<label htmlFor='street'>
						<b>Street:</b>
					</label>
					<input
						type='text'
						id='street'
						value={street}
						onChange={(e) => setStreet(e.target.value)}
						required
						placeholder='Enter street'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='city'>
						<b>City:</b>
					</label>
					<input
						type='text'
						id='city'
						value={city}
						onChange={(e) => setCity(e.target.value)}
						required
						placeholder='Enter city'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='state'>
						<b>State:</b>
					</label>
					<input
						type='text'
						id='state'
						value={state}
						onChange={(e) => setState(e.target.value)}
						required
						placeholder='Enter state'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='postalCode'>
						<b>Postal Code:</b>
					</label>
					<input
						type='text'
						id='postalCode'
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
						required
						placeholder='Enter postal code'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='country'>
						<b>Country:</b>
					</label>
					<input
						type='text'
						id='country'
						value={country}
						onChange={(e) => setCountry(e.target.value)}
						required
						placeholder='Enter country'
					/>
				</div>

				<div className='form-group'>
					<label htmlFor='phoneNumber'>
						<b>Phone Number:</b>
					</label>
					<input
						type='text'
						id='phoneNumber'
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						required
						placeholder='Enter phone number'
					/>
				</div>

				<button type='submit' className='submit-button' disabled={loading}>
					{loading ? "Adding..." : "Add Address"}
				</button>

				{error && <p className='error-message'>{error}</p>}
			</form>
		</div>
	);
};

export default AddAddress;
