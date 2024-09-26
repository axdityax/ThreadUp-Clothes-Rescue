import React from "react";
import { assets } from "../../../assets/assets";
import "./Step2.css"; // Assuming Step2.css is in the same directory

const Step2 = ({ formData, handleChange, prevStep, nextStep }) => {
	// This will create a preview URL for the uploaded image
	const imagePreview = formData.image ? URL.createObjectURL(formData.image) : assets.upload_area;

	return (
		<div className='step-2-container'>
			<h2>Select Clothes, Condition, and Preferred Action</h2>

			{/* Clothes Type */}
			<div className='clothes-type'>
				<p>Clothes Type</p>
				<select
					className='select-input'
					name='apparelType'
					onChange={handleChange}
					value={formData.apparelType}>
					<option value=''>--Select Type--</option>
					<option value='Shirt'>Shirt</option>
					<option value='T-shirt'>T-shirt</option>
					<option value='Jeans'>Jeans</option>
					<option value='Jacket'>Jacket</option>
					<option value='Sweater'>Sweater</option>
					<option value='Skirt'>Skirt</option>
					<option value='Pants'>Pants</option>
					<option value='Other'>Other</option>
				</select>
			</div>

			{/* Condition */}
			<div className='condition'>
				<p>Condition</p>
				<select
					className='select-input'
					name='condition'
					onChange={handleChange}
					value={formData.condition}>
					<option value=''>--Select Condition--</option>
					<option value='Good for donation'>Good for donation</option>
					<option value='Needs recycling'>Needs recycling</option>
					<option value='For disposal only'>For disposal only</option>
				</select>
			</div>

			{/* Preferred Action */}
			<div className='preferred-action'>
				<p>Preferred Action</p>
				<select
					className='select-input'
					name='preferredAction'
					onChange={handleChange}
					value={formData.preferredAction}>
					<option value=''>--Select Action--</option>
					<option value='Donate'>Donate</option>
					<option value='Recycle'>Recycle</option>
					<option value='Dispose'>Dispose</option>
				</select>
			</div>

			{/* Image Upload */}
			<div className='upload-image'>
				<p>Upload Image</p>
				<label htmlFor='image'>
					<img src={imagePreview} alt='Upload Area' />
				</label>
				<input
					type='file'
					id='image'
					onChange={(e) => handleChange(e, "image", e.target.files[0])} // Pass the file through handleChange
					hidden
					required
				/>
			</div>

			{/* Navigation Buttons */}
			<div className='navigation-buttons'>
				<button className='prev-button' onClick={prevStep}>
					Previous
				</button>
				<button
					className='next-button'
					disabled={
						!formData.apparelType ||
						!formData.condition ||
						!formData.preferredAction ||
						!formData.image
					}
					onClick={nextStep}>
					Next
				</button>
			</div>
		</div>
	);
};

export default Step2;
