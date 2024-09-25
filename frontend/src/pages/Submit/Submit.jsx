import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Submit.css"; // Reuse the CSS from the Add page for similar UI
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Submit = () => {
	const [data, setData] = useState({
		apparelType: "T-Shirt", // Set default value
		condition: "Good for donation",
		preferredAction: "Donate",
		location: "",
		image: null,
	});
	const { url } = useContext(StoreContext);

	// Handle input changes
	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setData((prevData) => ({ ...prevData, [name]: value }));
	};

	// Handle image change separately
	const onImageChangeHandler = (event) => {
		setData((prevData) => ({ ...prevData, image: event.target.files[0] }));
	};

	// Handle form submission
	const onSubmitHandler = async (event) => {
		event.preventDefault(); // Prevent page reload
		const formData = new FormData();
		formData.append("apparelType", data.apparelType);
		formData.append("condition", data.condition);
		formData.append("preferredAction", data.preferredAction);
		formData.append("location", data.location); // Assuming location is a string or ID from another model
		formData.append("image", data.image);

		try {
			const response = await axios.post(`${url}/api/submission/add`, formData);
			if (response.data.success) {
				toast.success("Submission added successfully!");
				// Clear form
				setData({
					apparelType: "T-Shirt", // Reset to default
					condition: "Good for donation",
					preferredAction: "Donate",
					location: "",
					image: null,
				});
			} else {
				toast.error(response.data.message);
			}
		} catch (error) {
			console.error("Error adding submission:", error);
			toast.error("Failed to add submission.");
		}
	};

	

	return (
		<div className='add'>
			<form className='flex-col' onSubmit={onSubmitHandler}>
				{/* Image Upload Section */}
				<div className='add-img-upload flex-col'>
					<p>Upload Image</p>
					<label htmlFor='image'>
						<img
							src={data.image ? URL.createObjectURL(data.image) : assets.upload_area}
							alt='Submission'
						/>
					</label>
					<input type='file' id='image' onChange={onImageChangeHandler} hidden required />
				</div>

				{/* Apparel Type Dropdown */}
				<div className='add-product-name flex-col'>
					<p>Apparel Type</p>
					<select
						name='apparelType'
						value={data.apparelType}
						onChange={onChangeHandler}
						required>
						<option value='T-Shirt'>T-Shirt</option>
						<option value='Pants'>Pants</option>
						<option value='Jacket'>Jacket</option>
						<option value='Shoes'>Shoes</option>
						<option value='Hat'>Hat</option>
						<option value='Sweater'>Sweater</option>
						<option value='Shorts'>Shorts</option>
						<option value='Skirt'>Skirt</option>
					</select>
				</div>

				{/* Condition Select */}
				<div className='add-product-description flex-col'>
					<p>Condition</p>
					<select
						name='condition'
						value={data.condition}
						onChange={onChangeHandler}
						required>
						<option value='Good for donation'>Good for donation</option>
						<option value='Needs recycling'>Needs recycling</option>
						<option value='For disposal only'>For disposal only</option>
					</select>
				</div>

				{/* Preferred Action Select */}
				<div className='add-product-description flex-col'>
					<p>Preferred Action</p>
					<select
						name='preferredAction'
						value={data.preferredAction}
						onChange={onChangeHandler}
						required>
						<option value='Donate'>Donate</option>
						<option value='Recycle'>Recycle</option>
						<option value='Dispose'>Dispose</option>
					</select>
				</div>

				{/* Location Input */}
				<div className='add-product-name flex-col'>
					<p>Location</p>
					<input
						type='text'
						name='location'
						placeholder='Enter your location'
						value={data.location}
						onChange={onChangeHandler}
						required
					/>
				</div>

				<button type='submit' className='add-btn'>
					Submit
				</button>
			</form>
		</div>
	);
};

export default Submit;
