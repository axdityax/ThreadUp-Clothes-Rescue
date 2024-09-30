import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
	return (
		<div className='sidebar'>
			<div className='sidebar-options'>
				<NavLink
					to='/'
					className='sidebar-option'
					activeClassName='active' // Highlight when active
				>
					<img src={assets.order_icon} alt='' />
					<p>Dashboard</p>
				</NavLink>
				<NavLink to='/submissions' className='sidebar-option' activeClassName='active'>
					<img src={assets.order_icon} alt='' />
					<p>Submissions</p>
				</NavLink>
				<NavLink to='/users' className='sidebar-option' activeClassName='active'>
					<img src={assets.order_icon} alt='' />
					<p>Users</p>
				</NavLink>
				<NavLink to='/center' className='sidebar-option' activeClassName='active'>
					<img src={assets.order_icon} alt='' />
					<p>Center</p>
				</NavLink>
			</div>
		</div>
	);
};

export default Sidebar;
