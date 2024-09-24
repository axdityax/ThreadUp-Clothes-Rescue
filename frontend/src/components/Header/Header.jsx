import React from "react";
import "./Header.css";

const Header = () => {
	return (
		<div className='header'>
			<div className='header-img'>
				<img
					src='https://media.istockphoto.com/id/178488141/photo/woman-recycling-clothes-at-clothing-bank.jpg?s=612x612&w=0&k=20&c=jpO9K1PtXskogbq-dsrsjS3k6mE1EEbcSVfrZlbn1NI='
					alt=''
				/>
			</div>

			<div className='header-contents'>
				<h2>Give Your Clothes a New Life</h2>
				<p>
					Looking to get rid of your unused or worn-out clothes? <br />
					Whether you want to donate, recycle, or responsibly dispose of them,{" "}
					<b>ThreadUp</b> is here to help! Our platform connects you with nearby centers
					that ensure your clothes are handled sustainably, making it easy for you to
					contribute to the environment while helping those in need.
				</p>
			</div>
		</div>
	);  
};

export default Header;
