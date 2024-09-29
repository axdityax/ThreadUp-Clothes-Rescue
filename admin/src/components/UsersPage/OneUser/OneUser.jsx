import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../../context/StoreContext";
import "./OneUser.css"; // Import CSS file for styling

const OneUser = () => {
	const { url, selectedUser } = useContext(StoreContext);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch user details when the component mounts or selectedUser changes
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await axios.post(`${url}/api/admin/users/oneuser`, {
					id: selectedUser, // Pass the selected user ID in the request body
				});
				setUser(response.data);
				setLoading(false);
			} catch (error) {
				setError("Error fetching user data");
				setLoading(false);
			}
		};

		if (selectedUser) {
			fetchUser();
		}
	}, [selectedUser, url]);

	if (loading) return <p className='loading-message'>Loading...</p>;
	if (error) return <p className='error-message'>Error: {error}</p>;

	return (
		<div className='one-user-container'>
			<h1 className='user-name'>{user.name}</h1>
			<p className='user-email'>Email: {user.email}</p>
			<p className='user-submission-count'>
				Number of Submissions: {user.submittedItems.length}
			</p>
			<h2 className='addresses-title'>Addresses:</h2>
			<ul className='addresses-list'>
				{user.addresses.map((address) => (
					<li key={address._id} className='address-item'>
						<p>
							<strong>Address:</strong>{" "}
							{`${address.street}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}, Phone: ${address.phoneNumber}`}
						</p>
					</li>
				))}
			</ul>
		</div>
	);
};

export default OneUser;
