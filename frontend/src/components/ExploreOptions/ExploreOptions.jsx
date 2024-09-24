import React from "react";
import "./ExploreOptions.css";
import { option_list } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const ExploreOption = () => {
	const navigate = useNavigate();

	return (
		<div className='action-menu' id='explore-menu'>
			<h1>Pick an action below and make a difference today!</h1>
			<p className='explore-option-text'>
				Do you have clothes you no longer wear? <br />
				Let's help you give them a new life! Whether you want to donate, recycle, or dispose
				of them responsibly, we have the right option for you. <br />
				<strong></strong>
			</p>

			<div className='explore-options'>
				{option_list.map((item, index) => (
					<div
						key={index}
						className='explore-option-item'
						onClick={() => navigate("/submit")}>
						<img
							src={item.category_image}
							alt={item.category_name}
							className='explore-option-image'
						/>
						<p className='explore-option-name'>{item.category_name}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default ExploreOption;
