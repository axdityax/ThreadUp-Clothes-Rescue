import React, { useContext, useState } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
	const [menu, setMenu] = useState("home");
	const { token, setToken } = useContext(StoreContext);
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem("token");
		setToken("");
		navigate("/");
	};

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
				<a
					href='#footer'
					onClick={() => {
						setMenu("contact-us");
						document.getElementById("footer");
					}}
					className={menu === "contact-us" ? "active" : ""}>
					contact us
				</a>
			</div>
			<div className='navbar-right'>
				{!token ? (
					<button
						onClick={() => {
							setShowLogin(true);
						}}>
						sign in
					</button>
				) : (
					<div className='navbar-profile'>
						<img src={assets.profile_icon} alt='' />
						<ul className='nav-profile-dropdown'>
							<li
								onClick={() => {
									navigate("/myorders");
								}}>
								<img src={assets.bag_icon} alt='' />
								<p>Orders</p>
							</li>
							<hr />
							<li onClick={logout}>
								<img src={assets.logout_icon} alt='' />
								<p>Logout</p>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
