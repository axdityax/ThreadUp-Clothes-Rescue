import React, { createContext, useEffect, useState } from "react"; // Import useState
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const url = "https://threadup-backend.onrender.com";

	const [selectedUser, setSelectedUser] = useState(null);

	const contextValue = {
		url,
		selectedUser,
		setSelectedUser,
	};

	return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
