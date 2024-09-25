import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
	const url = "http://localhost:4000";
	const [token, setToken] = useState("");

	useEffect(() => {
		async function loadData() {
			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
			}
		}

		loadData();
	}, []);
	
	const contextValue = { url, token, setToken };

	return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
