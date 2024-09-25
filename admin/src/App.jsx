import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import Submissions from "./pages/Submissions/Submissions";
import Center from "./pages/Center/Center";
import AddCenter from "./components/Center/AddCenter/AddCenter";

const App = () => {
	return (
		<div>
			<ToastContainer />
			<Navbar />
			<hr />
			<div className='app-content'>
				<Sidebar />
				<Routes>
					<Route path='/center' element={<Center />} />
					<Route path='/center/add' element={<AddCenter />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/submissions' element={<Submissions />} />
					<Route path='/users' element={<Users />} />
				</Routes>
			</div>
		</div>
	);
};

export default App;
