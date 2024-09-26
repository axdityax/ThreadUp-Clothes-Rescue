import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Step4.css";
import { StoreContext } from "../../../context/StoreContext";

const Step4 = ({ formData, prevStep, handleSubmit }) => {
	const [center, setCenter] = useState(null);
	const [address, setAddress] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const { url } = useContext(StoreContext);

	const getImagePreview = () => {
		if (formData.image && formData.image instanceof File) {
			return URL.createObjectURL(formData.image);
		}
		return null;
	};

	const imagePreviewUrl = getImagePreview();

	const fetchCenterById = async (id) => {
		const token = localStorage.getItem("token");
		try {
			const response = await axios.get(`${url}/api/user/center/${id}`, {
				headers: { token },
			});
			setCenter(response.data.data);
		} catch (error) {
			setError("Failed to fetch centers: " + error.message);
		}
	};

	const fetchAddressById = async (id) => {
		const token = localStorage.getItem("token");
		try {
			const response = await axios.get(`${url}/api/user/address/${id}`, {
				headers: { token },
			});
			setAddress([response.data.data]);
		} catch (error) {
			setError("Failed to fetch address: " + error.message);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				if (formData.selectedCenter) {
					await fetchCenterById(formData.selectedCenter);
				}
				if (formData.address) {
					await fetchAddressById(formData.address);
				}
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [formData.selectedCenter, formData.address]);

	useEffect(() => {
		return () => {
			if (imagePreviewUrl) {
				URL.revokeObjectURL(imagePreviewUrl);
			}
		};
	}, [imagePreviewUrl]);

	if (loading) return <p className='loading-message'>Loading...</p>;
	if (error) return <p className='error-message'>{error}</p>;

	return (
		<div className='review-submission'>
			<h2 className='submission-title'>Review Your Submission</h2>
			<p className='submission-detail'>
				<strong>Address:</strong> {address[0]?.street}, {address[0]?.city || "Not provided"}
			</p>
			<p className='submission-detail'>
				<strong>Clothes:</strong> {formData.apparelType || "Not provided"}
			</p>
			<p className='submission-detail'>
				<strong>Condition:</strong> {formData.condition || "Not provided"}
			</p>
			<p className='submission-detail'>
				<strong>Preferred Action:</strong> {formData.preferredAction || "Not provided"}
			</p>
			<p className='submission-detail'>
				<strong>Recycling Center:</strong> {center ? center.name : "Not provided"}
				{center && center.location
					? ` (Address: ${center.location.address}, Phone: ${center.contactInfo.phone})`
					: ""}
			</p>

			{imagePreviewUrl && (
				<p className='image-preview'>
					<strong>Image Preview:</strong>
					<img
						src={imagePreviewUrl}
						alt='Uploaded apparel preview'
						className='preview-image'
					/>
				</p>
			)}

			<div className='button-group'>
				<button className='prev-button' onClick={prevStep}>
					Previous
				</button>
				<button className='submit-button' onClick={handleSubmit}>
					Submit
				</button>
			</div>
		</div>
	);
};

export default Step4;
