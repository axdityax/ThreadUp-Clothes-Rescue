import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import Faq from "./pages/Faq/Faq";
import Track from "./pages/Track/Track";
import Centers from "./pages/Centers/Centers";
import Submit from "./pages/Submit/Submit";
import AddAddress from "./components/SubmitPage/AddAddress/AddAddress";

const App = () => {
	const [showLogin, setShowLogin] = useState(false);

	return (
		<>
			{showLogin && <LoginPopup setShowLogin={setShowLogin} />}{" "}
			<div className='app'>
				<Navbar setShowLogin={setShowLogin} />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/submit' element={<Submit />} />
					<Route path='/address/add' element={<AddAddress />} />
					{/* <Route path='/centers' element={<Centers />} /> */}
					<Route path='/track' element={<Track />} />
					<Route path='/faq' element={<Faq />} />
				</Routes>
			</div>
			<Footer />
		</>
	);
};

export default App;
