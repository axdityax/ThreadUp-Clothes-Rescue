
# ThreadUP

ThreadUP is a platform that allows users to submit information about their unused or worn-out apparel for proper disposal, donation, or recycling. This Minimum Viable Product (MVP) features a user-friendly interface for both users and administrators, making it easy to manage submissions and analytics.

## Live Demo
-[ThreadUp - Demo](https://drive.google.com/file/d/140IZlEV2jLUmF0uDQaR_hnhG_abMqcZw/view?usp=sharing)
  
## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)

## Features

### Admin Dashboard
- **Submission Analytics**: View trending months and submission statistics.
- **User Analytics**: Monitor active and inactive users.
- **Center Analytics**: Visualize data using a heatmap and track capacity.

### User Functionality
- **User Page**: 
  - Delete users.
  - Check user details and their submissions.
  
- **Submission Page**: 
  - View submissions by user.
  - Sort submissions by type (Recycle, Dispose, Donation).
  - Search submissions by user name.

### Frontend
- **Home Page**: Overview of the platform and its purpose.
- **User Login**: Secure login system with JWT for session management.
- **Submission Process**:
  - Add address, select center, and choose clothes in a stepwise manner.
  - Review submission details before final submission.
- **Track Page**: 
  - Track user submissions.
  - Sort functionality and search by apparel type.
- **FAQ Page**: Answers to common questions.
- **Contact Page**: Contact information for support and inquiries.

## Technologies Used
- **Frontend**: 
  - React
  - Redux (for state management)
  - Axios (for API calls)
  - CSS/Styled Components

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (for database)
  - JWT (for authentication)

## Installation

To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone [https://github.com/axdityax/ThreadUp-Clothes-Rescue.git]
   cd ThreadUP
   ```

2. **Set up the Backend**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory and add the following environment variables (replace the placeholders with your actual values):
     ```plaintext
     JWT_SECRET=your_jwt_secret
     PORT=your_preferred_port_number
     ```
   - Start the backend server:
     ```bash
     npm run server
     ```
   - Ensure the backend server is running successfully before proceeding to the frontend.

3. **Set up the Frontend**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Start the frontend application:
     ```bash
     npm run dev
     ```

4. **Set up the Admin**:
   - Navigate to the frontend directory:
     ```bash
     cd ../Admin
     ```
   - Install the necessary dependencies:
     ```bash
     npm install
     ```
   - Start the Admin application:
     ```bash
     npm run dev
     ```

5. **Testing the Application**:
   - After both the backend and frontend are running, test the application by logging in as a user and submitting information about apparel.
   - Use the admin dashboard to monitor submissions and user activity.

## Usage
- Navigate to the home page to learn more about the platform.
- Users can log in to manage their submissions or create a new submission.
- Admins can access the dashboard to view analytics and manage users and submissions.

