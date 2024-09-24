import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
const LoginPopup = ({ setShowLogin }) => {
	const [currState, setCurrState] = useState("Sign Up");
	const [data, setData] = useState({
		email: "",
		password: "",
		name: "",
	});

	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setData((prevData) => ({ ...prevData, [name]: value }));
	};

	return (
		<div className='login-popup'>
			<form className='login-popup-container'>
				<div className='login-popup-title'>
					<h2>{currState}</h2>
					<img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='Close' />
				</div>
				<div className='login-popup-inputs'>
					{currState !== "Login" && (
						<input
							name='name'
							type='text'
							onChange={onChangeHandler}
							value={data.name}
							placeholder='Your Name'
						/>
					)}
					<input
						name='email'
						onChange={onChangeHandler}
						type='email'
						value={data.email}
						placeholder='Your email'
					/>
					<input
						name='password'
						onChange={onChangeHandler}
						value={data.password}
						type='password'
						placeholder='Password'
					/>
				</div>
				<button type='submit'>
					{currState === "Sign Up" ? "Create account" : "Login"}
				</button>
				<div className='login-popup-condition'>
					<label>
						<input type='checkbox' required />
						<p>By continuing, I agree to the terms of use & privacy policy.</p>
					</label>
				</div>
				{currState === "Login" ? (
					<p>
						Create a new account?{" "}
						<span onClick={() => setCurrState("Sign Up")}>Click here</span>
					</p>
				) : (
					<p>
						Already have an account?{" "}
						<span onClick={() => setCurrState("Login")}>Login here</span>
					</p>
				)}
			</form>
		</div>
	);
};

export default LoginPopup;
