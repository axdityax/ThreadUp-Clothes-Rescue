import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setShowLogin }) => {
	const [menu, setMenu] = useState("home");
	const navigate = useNavigate();

	return (
		<div className='navbar'>
			<div className='logo'>ThreadUp</div>
			<div className='navbar-menu'>
				<div
					onClick={() => {
						setMenu("home");
						navigate("/");
					}}
					className={menu === "home" ? "active" : ""}>
					home
				</div>
				<div
					onClick={() => {
						setMenu("menu");
						navigate("/submit");
					}}
					className={menu === "menu" ? "active" : ""}>
					submit
				</div>
				<div
					onClick={() => {
						setMenu("mobile-app");
						navigate("/track");
					}}
					className={menu === "mobile-app" ? "active" : ""}>
					track
				</div>
				<div
					onClick={() => {
						setMenu("faq");
						navigate("/faq");
					}}
					className={menu === "faq" ? "active" : ""}>
					faq
				</div>
				<div
					onClick={() => {
						setMenu("contact-us");
						document.getElementById("footer");
					}}
					className={menu === "contact-us" ? "active" : ""}>
					contact us
				</div>
			</div>
			<div className='navbar-right'>
				<button
					onClick={() => {
						setShowLogin(true);
					}}>
					sign in
				</button>
			</div>
		</div>
	);
};

export default Navbar;
