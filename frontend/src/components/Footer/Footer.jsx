import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
	return (
		<div className='footer' id='footer'>
			<div className='footer-content'>
				<div className='footer-content-left'>
					<div className='footer-logo'>ThreadUp</div>
					<p>Thank You For Visiting Us :)</p>
					<div className='footer-social-icons'>
						<img src={assets.facebook_icon} alt='Facebook' />
						<img src={assets.twitter_icon} alt='Twitter' />
						<img src={assets.linkedin_icon} alt='LinkedIn' />
					</div>
				</div>
				<div className='footer-content-right'>
					<h2>COMPANY</h2>
					<ul>
						<li>Our Team</li>
						<li>About Us</li>
						<li>Delivery</li>
						<li>Privacy policy</li>
					</ul>
				</div>
				<div className='footer-content-center'>
					<h2>GET IN TOUCH</h2>
					<ul>
						<li>+91-8854888821</li>
						<li>contact@ThreadUp.com</li>
					</ul>
				</div>
			</div>
			<hr />
			<p className='footer-copyright'>Copyright 2023. All rights reserved.</p>
		</div>
	);
};

export default Footer;
