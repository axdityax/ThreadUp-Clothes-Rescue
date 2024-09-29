import React from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
const Navbar = () => {
	return (
		<div>
			<div className='navbar'>
				<div className='admin-logo'>ThreadUp</div>
				<img className='profile' src={assets.profile_image} alt='' />
			</div>
		</div>
	);
};

export default Navbar;
