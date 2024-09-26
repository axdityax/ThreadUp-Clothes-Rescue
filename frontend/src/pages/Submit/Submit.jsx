import React, { useState } from "react";
import Step1 from "../../components/SubmitPage/Step1/Step1";
import Step2 from "../../components/SubmitPage/Step2/Step2";
import Step3 from "../../components/SubmitPage/Step3/Step3";

const Submit = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({});

	const handleNext = (data) => {
		setFormData((prevData) => ({ ...prevData, ...data }));
		setStep((prevStep) => prevStep + 1);
	};

	const handleSubmit = async (data) => {
		// Handle the final submission here
		const submissionData = { ...formData, ...data };
		// You can use axios here to send the data to your server
		console.log("Final Submission Data:", submissionData);
	};

	return (
		<div id='submit'>
			{step === 1 && <Step1 onNext={handleNext} />}
			{step === 2 && <Step2 onNext={handleNext} previousData={formData} />}
			{step === 3 && <Step3 onSubmit={handleSubmit} previousData={formData} />}
		</div>
	);
};

export default Submit;
