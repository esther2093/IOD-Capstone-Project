import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ProfilePictureForm from "./ProfilePictureForm";
import { useUserContext } from "../context/UserContext";
import useTripData from "../hooks/useTripData";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export default function MyAccount() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData(); // Fetch trip data using the hook
  const userTrips = allTrips.filter((trip) => trip.userId === currentUser.id); 

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
          <Box className="account-col-33">
            <ProfilePictureForm />

            <Box className="profile-details-box">
              {currentUser ? (
                <div>
                  <Typography variant="h4">Profile Details</Typography>
                  <Typography variant="h6">
                    First Name: {currentUser.firstName}
                  </Typography>
                  <Typography variant="h6">
                    Last Name: {currentUser.lastName}
                  </Typography>
                  <Typography variant="h6">
                    Date of Birth: {formatDate(currentUser.dateOfBirth)}
                  </Typography>
                  <Typography variant="h6">Email: {currentUser.email}</Typography>
                  <Typography variant="h6">
                    Phone Number: {currentUser.phoneNumber}
                  </Typography>
                </div>
              ) : (
                <Typography variant="h6">Loading user data...</Typography>
              )}
            </Box>
          </Box>
          <Box className="account-col-66">
            <Box className="posted-trips">
              <Typography variant="h4">Posted Trips</Typography>
              {userTrips.length === 0 ? (
                <Typography variant="h6">No posted trips yet.</Typography>
              ) : (
                userTrips.map((trip) => (
                  <Paper key={trip.id} elevation={3} className="trip-card">
                    {/* Render trip details here, e.g., trip.destination, trip.date, etc. */}
                    <Typography variant="h6">Destination: {trip.cityFrom}</Typography>
                    <Typography variant="h6">Date: {formatDate(trip.depatureDate)}</Typography>
                    {/* Add more trip details as needed */}
                  </Paper>
                ))
              )}
            </Box>
            <Box className="active-trips">
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
