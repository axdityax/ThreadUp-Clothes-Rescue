import React from "react";
import { useNavigate } from "react-router-dom";
import "./StepNavbar.css"; // Assuming you'll use CSS for styling

const StepNavbar = ({ currentStep }) => {
	const navigate = useNavigate();

	return (
		<div className='step-navbar'>
			<h3>Steps Navbar</h3>
			<div className='navbar-buttons'>
				<button
					className={currentStep === 1 ? "active" : ""}
					onClick={() => navigate("/submit")}
					disabled={currentStep < 1}>
					Step 1
				</button>
				<button
					className={currentStep === 2 ? "active" : ""}
					onClick={() => navigate("/submit/step2")}
					disabled={currentStep < 2}>
					Step 2
				</button>
				<button
					className={currentStep === 3 ? "active" : ""}
					onClick={() => navigate("/submit/step3")}
					disabled={currentStep < 3}>
					Step 3
				</button>
			</div>
		</div>
	);
};

export default StepNavbar;
