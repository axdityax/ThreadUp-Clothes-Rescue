import React, { createContext, useEffect, useState } from "react"; // Import useState
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const url = "http://localhost:4000";

	// useEffect(() => {
	// 	console.log(cartItems);
	// }, [cartItems]);

	// useEffect(() => {
	// 	async function loadData() {
	// 		await fetchFoodList();
	// 		if (localStorage.getItem("token")) {
	// 			setToken(localStorage.getItem("token"));
	// 			await loadCartData(localStorage.getItem("token"));
	// 		}
	// 	}

	// 	loadData();
	// }, []);

	const contextValue = {
		url,
	};

	return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
