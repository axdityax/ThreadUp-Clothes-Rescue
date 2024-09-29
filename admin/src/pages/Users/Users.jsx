import React from "react";
import { Route, Routes } from "react-router-dom";
import AllUsers from "../../components/UsersPage/AllUsers/AllUsers";
import OneUser from "../../components/UsersPage/OneUser/OneUser";
import "./Users.css";
const Users = () => {
	return (
		<div className='admin-users'>
			<div className='admin-user-container'>
				<Routes>
					<Route path='/' element={<AllUsers />} />
					<Route path='/user' element={<OneUser />} />
				</Routes>
			</div>
		</div>
	);
};

export default Users;
