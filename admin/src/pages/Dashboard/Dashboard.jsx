import React, { useState, useEffect } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	ArcElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { MapContainer, TileLayer, CircleMarker, Tooltip as LeafletTooltip } from "react-leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./Dashboard.css";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	LineElement,
	PointElement,
	ArcElement,
	Title,
	Tooltip,
	Legend
);

const AdminNavbar = ({ activeSection, setActiveSection }) => {
	return (
		<nav className='admin-navbar'>
			<ul>
				<li>
					<button
						className={activeSection === "users" ? "active" : ""}
						onClick={() => setActiveSection("users")}>
						User Analytics
					</button>
				</li>
				<li>
					<button
						className={activeSection === "submissions" ? "active" : ""}
						onClick={() => setActiveSection("submissions")}>
						Submission Analytics
					</button>
				</li>
				<li>
					<button
						className={activeSection === "trends" ? "active" : ""}
						onClick={() => setActiveSection("trends")}>
						Submission Trends
					</button>
				</li>
				<li>
					<button
						className={activeSection === "centers" ? "active" : ""}
						onClick={() => setActiveSection("centers")}>
						Center Analytics
					</button>
				</li>
			</ul>
		</nav>
	);
};

const Dashboard = () => {
	const [userAnalytics, setUserAnalytics] = useState({});
	const [submissionAnalytics, setSubmissionAnalytics] = useState({});
	const [centerAnalytics, setCenterAnalytics] = useState([]);
	const [loading, setLoading] = useState(true);
	const [activeSection, setActiveSection] = useState("users");
	const { url } = useContext(StoreContext);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userData = await axios.get(`${url}/api/admin/user/stats`);
				const submissionData = await axios.get(`${url}/api/admin/submission/stats`);
				const centerData = await axios.get(`${url}/api/admin/center/stats`);

				setUserAnalytics(userData.data);
				setSubmissionAnalytics(submissionData.data);
				setCenterAnalytics(centerData.data);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching analytics data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	if (loading) {
		return <div>Loading...</div>;
	}

	const userChartData = {
		labels: ["Total Users", "Active Users", "Inactive Users"],
		datasets: [
			{
				label: "Users",
				data: [
					userAnalytics.total || 0,
					userAnalytics.active || 0,
					userAnalytics.inactive || 0,
				],
				backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
			},
		],
	};

	const submissionChartData = {
		labels: ["Recycle", "Donate", "Dispose"],
		datasets: [
			{
				label: "Submissions",
				data: [
					submissionAnalytics.recycle || 0,
					submissionAnalytics.donate || 0,
					submissionAnalytics.dispose || 0,
				],
				backgroundColor: ["#1abc9c", "#f1c40f", "#e67e22"],
			},
		],
	};

	const submissionTrendData = {
		labels: submissionAnalytics.trendLabels || [],
		datasets: [
			{
				label: "Submissions Over Time",
				data: submissionAnalytics.trendData || [],
				fill: false,
				backgroundColor: "#3498db",
				borderColor: "#3498db",
				tension: 0.1,
			},
		],
	};

	return (
		<div className='dashboard'>
			<h2>Admin Dashboard</h2>
			<AdminNavbar activeSection={activeSection} setActiveSection={setActiveSection} />

			{activeSection === "users" && (
				<div className='chart-container'>
					<h3>User Analytics</h3>
					<div className='analytics-charts'>
						<Bar data={userChartData} options={{ responsive: true }} />
					</div>
				</div>
			)}

			{activeSection === "submissions" && (
			  <div className='chart-container'>
			    <h3>Submission Analytics</h3>
			    <div className='analytics-charts'>
			      <div style={{ width: "300px", height: "300px" }}> {/* Adjust size here */}
			        <Pie data={submissionChartData} options={{ responsive: true }} />
			      </div>
			    </div>
			  </div>
			)}


			{activeSection === "trends" && (
				<div className='chart-container'>
					<h3>Submission Trends</h3>
					<div className='analytics-charts'>
						<Line data={submissionTrendData} options={{ responsive: true }} />
					</div>
				</div>
			)}

			{activeSection === "centers" && (
				<div className='chart-container'>
					<h3>Center Analytics (Heatmap)</h3>
					<MapContainer
						center={[51.505, -0.09]}
						zoom={13}
						scrollWheelZoom={false}
						className='heatmap'>
						<TileLayer
							url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						/>
						{centerAnalytics.map((center, idx) => (
							<CircleMarker
								key={idx}
								center={[center.latitude, center.longitude]}
								radius={20 * center.capacityUtilization}
								color='#e74c3c'>
								<LeafletTooltip>
									<div>
										<strong>{center.name}</strong>
										<p>
											Capacity Utilization: {center.capacityUtilization * 100}
											%
										</p>
									</div>
								</LeafletTooltip>
							</CircleMarker>
						))}
					</MapContainer>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
