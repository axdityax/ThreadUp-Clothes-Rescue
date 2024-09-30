import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";

const Navbar = ({ setShowLogin }) => {
	const { token, setToken } = useContext(StoreContext);
	const navigate = useNavigate();
	const [menu, setMenu] = useState(localStorage.getItem("menu") || "home"); // Retrieve from localStorage

	useEffect(() => {
		localStorage.setItem("menu", menu); 
	}, [menu]);

	const logout = () => {
		localStorage.removeItem("token");
		setToken("");
		navigate("/");
	};

	const handleMenuClick = (menuName) => {
		setMenu(menuName);
		navigate(menuName === "home" ? "/" : `/${menuName}`);
	};

	return (
		<div className='navbar'>
			<div
				style={{ cursor: "pointer" }}
				onClick={() => {
					navigate("/");
					setMenu("home");
				}}
				className='logo'
				role='button'
				tabIndex='0'
				onKeyPress={(e) => e.key === "Enter" && navigate("/")}>
				ThreadUp
			</div>

			<div className='navbar-menu'>
				<div
					onClick={() => handleMenuClick("home")}
					className={menu === "home" ? "active" : ""}>
					home
				</div>
				<div
					onClick={() => handleMenuClick("submit")}
					className={menu === "submit" ? "active" : ""}>
					submit
				</div>
				<div
					onClick={() => handleMenuClick("track")}
					className={menu === "track" ? "active" : ""}>
					track
				</div>
				<div
					onClick={() => handleMenuClick("faq")}
					className={menu === "faq" ? "active" : ""}>
					faq
				</div>
				<a
					href='#footer'
					onClick={() => {
						handleMenuClick("contact-us");
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
									navigate("/track");
								}}>
								<img src={assets.bag_icon} alt='' />
								<p>Track</p>
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
