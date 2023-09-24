import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import { Box, Typography, Paper } from "@mui/material";
import useUserData from "../hooks/useUserData"; // Import the useUserData hook

export default function MyAccount() {
  const { users } = useUserData(); // Fetch user data using the hook
  const [currentUser, setCurrentUser] = useState(null); // State to store the current user

  useEffect(() => {
    // Assuming you have some way to identify the current user, e.g., email
    const currentUserEmail = "esther@esther.com";

    // Find the current user in the fetched user data
    const foundUser = users.find((user) => user.email === currentUserEmail);

    // Set the current user in state
    setCurrentUser(foundUser);
  }, [users]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Paper elevation={0} square className="my-account-page">
        <Box className="banner-content" id="banner-top">
          <Box className="col-45">
            <Box className="banner-section-heading">
              <Typography variant="body1" className="breakline">
                —
              </Typography>
              <Typography variant="h2" id="myAccount-main-header">
                Your Account Details
              </Typography>
              <Typography variant="h3" id="myAccount-main-subtitle">
                Everything you need
              </Typography>
              <Typography variant="body1" className="breakline">
                —
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>

      <Container disableGutters component="main" maxWidth="lg">
        <Box className="my-account-container">
          <div className="account-col-33">
            <div className="profile-pic-box">
              {/* Add your profile picture component here */}
            </div>
            <div className="profile-details-box">
              {currentUser ? (
                <div>
                  <Typography variant="h4">Profile Details</Typography>
                  <Typography variant="h6">First Name: {currentUser.firstName}</Typography>
                  <Typography variant="h6">Last Name: {currentUser.lastName}</Typography>
                  <Typography variant="h6">Date of Birth: {currentUser.dateofBirth}</Typography>
                  <Typography variant="h6">Email: {currentUser.email}</Typography>
                  <Typography variant="h6">Phone Number: {currentUser.phoneNumber}</Typography>
                </div>
              ) : (
                <Typography variant="h6">Loading user data...</Typography>
              )}
            </div>
          </div>
          <div className="account-col-66">
            <div className="posted-trips">dfdf</div>
            <div className="active-trips">dfdfd</div>
          </div>
        </Box>
      </Container>
    </Box>
  );
}
