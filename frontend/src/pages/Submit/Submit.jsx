import React, { useState } from "react";
import Step1 from "../../components/SubmitPage/Step1/Step1";
import Step2 from "../../components/SubmitPage/Step2/Step2";
import Step3 from "../../components/SubmitPage/Step3/Step3";
import Step4 from "../../components/SubmitPage/Step4/Step4";

const Submit = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		address: "", // location in schema
		apparelType: "", // apparelType in schema
		condition: "", // condition in schema (Good for donation, Needs recycling, For disposal only)
		preferredAction: "", // donate, recycle, or dispose
		image: "", // image (URL or file upload)
		selectedCenter: "", // center in schema
	});

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

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
		alert("Form submitted!");
		// Add submit logic here
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

// import React, { useState } from "react";
// import Step1 from "../../components/SubmitPage/Step1/Step1";
// import Step2 from "../../components/SubmitPage/Step2/Step2";
// import Step3 from "../../components/SubmitPage/Step3/Step3";
// import Step4 from "../../components/SubmitPage/Step4/Step4";

// const Submit = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     address: "",
//     clothes: "",
//     condition: "",
//     recyclingCenter: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//     alert("Form submitted!");
//     // Add submit logic here
//   };

//   return (
//     <div>
//       {step === 1 && <Step1 formData={formData} handleChange={handleChange} nextStep={nextStep} />}
//       {step === 2 && <Step2 formData={formData} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} />}
//       {step === 3 && <Step3 formData={formData} handleChange={handleChange} prevStep={prevStep} nextStep={nextStep} />}
//       {step === 4 && <Step4 formData={formData} prevStep={prevStep} handleSubmit={handleSubmit} />}
//     </div>
//   );
// };

// export default Submit;
