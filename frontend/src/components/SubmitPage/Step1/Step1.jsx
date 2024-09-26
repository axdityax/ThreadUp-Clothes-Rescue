import React, { useState, useEffect } from "react";
import { assets } from "../../../assets/assets";
assets;

const Step1 = ({ onNext }) => {
	const [data, setData] = useState({
		condition: "Good for donation",
		preferredAction: "Donate",
		image: null,
	});

	const onChangeHandler = (event) => {
		const { name, value } = event.target;
		setData((prevData) => ({ ...prevData, [name]: value }));
	};

	const onImageChangeHandler = (event) => {
		setData((prevData) => ({ ...prevData, image: event.target.files[0] }));
	};

	const handleNext = (event) => {
		event.preventDefault();
		onNext(data); // Pass data to next step
	};

	useEffect(() => {
		// Cleanup for image URL
		return () => {
			if (data.image) URL.revokeObjectURL(URL.createObjectURL(data.image));
		};
	}, [data.image]);

	return (
		<form onSubmit={handleNext}>
			{/* Image Upload Section */}
			<div>
				<p>Upload Image</p>
				<label htmlFor='image'>
					<img
						src={data.image ? URL.createObjectURL(data.image) : assets.upload_area}
						alt='Submission'
					/>
				</label>
				<input type='file' id='image' onChange={onImageChangeHandler} hidden required />
			</div>

			{/* Condition Select */}
			<select name='condition' value={data.condition} onChange={onChangeHandler} required>
				<option value='Good for donation'>Good for donation</option>
				<option value='Needs recycling'>Needs recycling</option>
				<option value='For disposal only'>For disposal only</option>
			</select>

			{/* Preferred Action Select */}
			<select
				name='preferredAction'
				value={data.preferredAction}
				onChange={onChangeHandler}
				required>
				<option value='Donate'>Donate</option>
				<option value='Recycle'>Recycle</option>
				<option value='Dispose'>Dispose</option>
			</select>

			<button type='submit'>Next</button>
		</form>
	);
};

export default Step1;
