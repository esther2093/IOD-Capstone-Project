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


function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return 
}

export default function MyAccount() {
  const { currentUser } = useUserContext();
  const { allTrips } = useTripData();
  const userTrips = allTrips.filter((trip) => trip.userId === currentUser.id);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="banner-content" id="second-banner-top">
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography
              gutterBottom
              variant="h4"
              id="banner-main-header"
              sx={{ letterSpacing: -5 }}
            >
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

      <Box sx={{ flexGrow: 1 }}>
        <Grid spacing={1} container className="my-account-box" sx={{ margin: "0"}}>
          <Grid
            item
            className="my-acount-details"
            xs={12}
            sm={12}
            md={4}
            sx={{ pr: "0.5em", pb: "0.5em" }}
          >
            <Paper square elevation={3}>
              <Box sx={{ justifyContent: "center"}}>
              <Avatar variant="square" sx={{ width: "100%", height: "100%", margin: 0, backgroundColor: "white" }}>
                   <img className="uploaded-profile-pic" src={"http://localhost:8000/"+currentUser.profilePicture} width="285" /> 
                </Avatar>
                <ProfilePictureDialog />
              </Box>


              <Typography variant="h4">Profile Details</Typography>
              <Typography variant="h6">
                Name: {currentUser.firstName} {currentUser.lastName}
              </Typography>
              <Typography variant="h6">
                Date of Birth: {formatDate(currentUser.dateOfBirth)}
              </Typography>
              <Typography variant="h6">Email: {currentUser.email}</Typography>
              <Typography variant="h6">
                {" "}
                Phone Number: +61 {currentUser.phoneNumber}
              </Typography>
            </Paper>
          </Grid>

          <Grid
            item
            className="my-posted-trips"
            xs={12}
            sm={12}
            md={8}
            sx={{ pr: "0.5em", pb: "0.5em" }}
          >
            <Paper square elevation={3} >
            <Typography variant="h4">Posted Trips</Typography>
              <Grid container className="trip-card" sx={{ padding: "1em" }}>
              
              {userTrips.length === 0 ? (
                <Typography variant="h6">You haven't posted any trips yet :(</Typography>
              ) : (

                userTrips.map((trip) => (  
                    <Grid item key={trip.id} xs={12} sm={6} md={4} sx={{ padding: "1em" }} >
                      <Card>
                        <CardContent>
                          <Typography variant="h6">
                            From: {trip.cityFrom}
                          </Typography>
                          <Typography variant="h6">
                            To: {trip.cityTo}
                          </Typography>
                          <Typography variant="body2">
                            Departure Date: {formatDate(trip.depatureDate)}
                          </Typography>
                          <Typography variant="body2">
                            Arrival Date: {formatDate(trip.arrivalDate)}
                          </Typography>

                          <Box display="flex" justifyContent="center">
                            <Link
                              to={`/trip/${trip.id}`}
                              style={{ textDecoration: "none" }}
                            >
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
        <Box className="active-trips"></Box>
      </Box>
    </Box>
  );
}
