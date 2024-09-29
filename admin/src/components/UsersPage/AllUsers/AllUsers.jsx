import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../../context/StoreContext";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom
import "./AllUsers.css"; // Make sure to import the CSS file

const AllUsers = () => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState(""); // State for search term
	const { url, selectedUser, setSelectedUser } = useContext(StoreContext);
	const navigate = useNavigate(); // Initialize useNavigate

	// Fetch all users from the API
	const fetchUsers = async () => {
		try {
			const response = await axios.get(`${url}/api/admin/allusers`);
			setUsers(response.data);
			setLoading(false);
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	// Delete user by ID (using POST)
	const deleteUser = async (userId) => {
		setError(null); // Reset error before new action
		try {
			await axios.post(`${url}/api/admin/users/delete/${userId}`);
			// Remove user from the state after successful deletion
			setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
		} catch (error) {
			setError("Error deleting user.");
		}
	};

	// Call fetchUsers on component mount
	useEffect(() => {
		fetchUsers();
	}, []); // Ensure this runs only on mount by keeping the dependency array empty

	// Filter users based on search term
	const filteredUsers = users.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (loading) return <p className='loading-message'>Loading...</p>;
	if (error) return <p className='error-message'>Error: {error}</p>;

	return (
		<div className='all-users-container'>
			<h1 className='title'>All Users</h1>
			<input
				type='text'
				className='search-input'
				placeholder='Search by name or email...'
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)} // Update search term
			/>
			{filteredUsers.length > 0 ? (
				<table className='user-table'>
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Submitted Items</th>
							<th>Addresses</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((user) => (
							<tr key={user._id}>
								<td className='user-name'>
									<span
										className='user-link'
										onClick={() => {
											setSelectedUser(user._id); // Set selected user ID
											navigate(`/users/user`); // Corrected to navigate to /users/user
										}}>
										{user.name}
									</span>
								</td>
								<td className='user-email'>{user.email}</td>
								<td className='submitted-items'>{user.submittedItems.length}</td>
								<td className='addresses-count'>{user.addresses.length}</td>
								<td>
									<button
										className='delete-button'
										onClick={() => deleteUser(user._id)}>
										&#10060; {/* Unicode for a cross (X) symbol */}
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p className='no-users-message'>No users found.</p>
			)}
		</div>
	);
};

export default AllUsers;
