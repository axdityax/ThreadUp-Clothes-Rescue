import React, { useContext, useState } from "react";
import axios from "axios"; // Import axios
import Step1 from "../../components/SubmitPage/Step1/Step1";
import Step2 from "../../components/SubmitPage/Step2/Step2";
import Step3 from "../../components/SubmitPage/Step3/Step3";
import Step4 from "../../components/SubmitPage/Step4/Step4";
import { StoreContext } from "../../context/StoreContext";

const Submit = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		address: "",
		apparelType: "",
		condition: "",
		preferredAction: "",
		image: null, // Change to null for file upload
		selectedCenter: "",
	});

	const { url } = useContext(StoreContext);

	const handleChange = (e, name, value) => {
		if (name === "image") {
			setFormData({ ...formData, image: value }); // For image files
		} else {
			const { name, value } = e.target;
			setFormData({ ...formData, [name]: value });
		}
	};

	const nextStep = () => {
		if (step < 4) setStep(step + 1);
	};

	const prevStep = () => {
		if (step > 1) setStep(step - 1);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formDataToSubmit = new FormData();

		// Append form fields and image
		Object.keys(formData).forEach((key) => {
			if (key === "image" && formData[key]) {
				formDataToSubmit.append(key, formData[key]); // Handle image upload
			} else {
				formDataToSubmit.append(key, formData[key]);
			}
		});

		// Debugging: Log FormData entries
		for (let [key, value] of formDataToSubmit.entries()) {
			console.log(key, value);
		}

		const token = localStorage.getItem("token");
		try {
			const response = await axios.post(`${url}/api/user/submit/details`, formDataToSubmit, {
				headers: {
					"Content-Type": "multipart/form-data",
					token,
				},
			});
			console.log("Submission successful:", response.data);
			alert("Form submitted successfully!");

			// Reset form data and step after successful submission
			setFormData({
				address: "",
				apparelType: "",
				condition: "",
				preferredAction: "",
				image: null, // Reset image field
				selectedCenter: "",
			});
			setStep(1); // Go back to Step 1
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("Failed to submit the form. Please try again.");
		}
	};

	return (
		<div>
			{step === 1 && (
				<Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} />
			)}
			{step === 2 && (
				<Step2
					formData={formData}
					handleChange={handleChange}
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			)}
			{step === 3 && (
				<Step3
					formData={formData}
					handleChange={handleChange}
					prevStep={prevStep}
					nextStep={nextStep}
				/>
			)}
			{step === 4 && (
				<Step4 formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} />
			)}
		</div>
	);
};

export default Submit;
