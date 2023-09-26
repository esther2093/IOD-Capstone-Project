import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ProfilePictureDialog from "./ProfilePictureDialog";
import { useUserContext } from "../context/UserContext";
import useTripData from "../hooks/useTripData";
import { Avatar, Button, Card, CardContent, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";

function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '+61 $1-$2-$3');
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export default function MyAccount() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();
  const userTrips = allTrips.filter((trip) => trip.userId === currentUser.id);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <Box className="banner-content" id="second-banner-top">
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography gutterBottom variant="h4" id="banner-main-header" sx={{ letterSpacing: -5 }}>
              My Account
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              All your details for you to see
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", p: "0.5em" }}>
        <Grid container spacing={0} className="my-account-box">
          <Grid item className="my-acount-details" xs={12} sm={6} md={4} lg={3} xl={2.5}>
            <Paper square elevation={3} sx={{ m: "0.5em" }}>
              <Grid item sx={{ ml: "1em" }}>
                <Avatar
                  variant="square"
                  sx={{
                    width: "90%",
                    height: "90%",
                    pt: "1em",
                    pb: "1em",
                    backgroundColor: "white",
                  }}
                >
                  <img src={"http://localhost:8000/" + currentUser.profilePicture} width="100%" alt={"NO PROFILE PICTURE"} />
                </Avatar>
              </Grid>
              <Box>
                <ProfilePictureDialog />
              </Box>

              <Grid item sx={{ p: "1em" }}>
                <Typography variant="h6" className="section-subhead" sx={{ fontSize: "1em" }}>
                  ABOUT YOU
                </Typography>
                <Typography variant="h4" className="section-title" sx={{ fontSize: "1.7em", fontWeight: 800 }}>
                  Profile Details:
                </Typography>

                <Box sx={{ px: "2em", py: "1em" }}>
                  <Typography variant="body1" sx={{ fontSize: "0.9em" }}>
                    Name: {currentUser.firstName} {currentUser.lastName}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9em" }}>
                    Date of Birth: {formatDate(currentUser.dateOfBirth)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9em" }}>
                    Email: {currentUser.email}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9em" }}>
                    Phone number: {currentUser.phoneNumber}
                  </Typography>
                </Box>
 
                <Box>
                  <UpdateProfile />
                </Box>

              </Grid>
            </Paper>
          </Grid>

          <Grid item className="my-active-trips" xs={12} sm={6} md={8} lg={9} xl={9.5}>
            <Paper square elevation={3} sx={{ m: "0.5em" }}>
              <Box sx={{ flexGrow: 1, padding: "1em 1em 0em 1em" }}>
                <Typography variant="h6" className="section-subhead" sx={{ fontSize: "1em" }}>
                  ACTIVE TRIPS
                </Typography>
                <Typography variant="h4" className="section-title" sx={{ fontSize: "1.7em", fontWeight: 800 }}>
                  Active Trips:
                </Typography>
              </Box>

              <Grid container className="trip-card" sx={{ padding: "1em" }}>
                {userTrips.length === 0 ? (
                  <Typography variant="body1" sx={{ padding: "0.5em 1em 2em 0.5em" }}>
                    You haven't enquired on any trips yet :(
                  </Typography>
                ) : (
                  userTrips.map((trip) => (
                    <Grid item key={trip.id} xs={12} sm={12} md={6} lg={4} xl={3} sx={{ padding: "1em" }}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">From: {trip.cityFrom}</Typography>
                          <Typography variant="h6">To: {trip.cityTo}</Typography>
                          <Typography variant="body2">Departure Date: {formatDate(trip.depatureDate)}</Typography>
                          <Typography variant="body2">Arrival Date: {formatDate(trip.arrivalDate)}</Typography>

                          <Box display="flex" justifyContent="center">
                            <Link to={`/trip/${trip.id}`} style={{ textDecoration: "none" }}>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#D2B356",
                                  margin: "1em",
                                  marginLeft: 0,
                                  "   &:hover": {
                                    backgroundColor: "#fff",
                                    color: "#D2B356",
                                  },
                                }}
                              >
                                More Details
                              </Button>
                            </Link>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Paper>

            <Paper square elevation={3} sx={{ m: "0.5em " }}>
              <Box sx={{ flexGrow: 1, padding: "1em 1em 0em 1em" }}>
                <Typography variant="h6" className="section-subhead" sx={{ fontSize: "1em" }}>
                  YOUR TRIPS
                </Typography>
                <Typography variant="h4" className="section-title" sx={{ fontSize: "1.7em", fontWeight: 800 }}>
                  Posted Trips:
                </Typography>
              </Box>

              <Grid container className="trip-card" sx={{ padding: "1em" }}>
                {userTrips.length === 0 ? (
                  <Typography variant="body1" sx={{ padding: "0.5em 1em 2em 0.5em" }}>
                    You haven't posted any trips yet :(
                  </Typography>
                ) : (
                  userTrips.map((trip) => (
                    <Grid item key={trip.id} xs={12} sm={6} md={4} sx={{ padding: "1em" }}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">From: {trip.cityFrom}</Typography>
                          <Typography variant="h6">To: {trip.cityTo}</Typography>
                          <Typography variant="body2">Departure Date: {formatDate(trip.depatureDate)}</Typography>
                          <Typography variant="body2">Arrival Date: {formatDate(trip.arrivalDate)}</Typography>

                          <Box display="flex" justifyContent="center">
                            <Link to={`/trip/${trip.id}`} style={{ textDecoration: "none" }}>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#D2B356",
                                  margin: "1em",
                                  marginLeft: 0,
                                  "   &:hover": {
                                    backgroundColor: "#fff",
                                    color: "#D2B356",
                                  },
                                }}
                              >
                                More Details
                              </Button>
                            </Link>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))
                )}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
