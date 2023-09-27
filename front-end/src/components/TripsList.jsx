import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import useTripData from "../hooks/useTripData";
import Box from "@mui/system/Box";
import { Button, ButtonBase, Paper, TextField, styled } from "@mui/material";
import useUserData from "../hooks/useUserData";
import TripDetails from "./TripDetails";
import bannerBg from "../assets/bannerImage.jpg";
import formatDate from "./FormatDateLocale";

const Img = styled("img")({
  margin: 'auto',
  display: 'block',
  maxWidth: "90%",
  maxHeight: "90%",
  padding: "0.25em",
});

export default function TripsList() {
  const { allTrips } = useTripData();
  const { users } = useUserData();

  const [filteredTrips, setFilteredTrips] = useState(allTrips);
  const [searchTerm, setSearchTerm] = useState("");

  const [userFirstNames, setUserFirstNames] = useState([]);

  const [userProfilePicture, setUserProfilePictures] = useState([]);

  useEffect(() => {
    const firstNamesArray = users.map((user) => user.firstName);
    setUserFirstNames(firstNamesArray);
    // console.log("First Names:", firstNamesArray);
  }, [users]);

  useEffect(() => {
    const profilePictureArray = users.map((user) => user.profilePicture);
    setUserProfilePictures(profilePictureArray);
    // console.log("Profile Picture:", profilePictureArray);
  }, [users]);

  const handleSearch = () => {
    const formattedSearchTerm = searchTerm.toLowerCase();

    const filtered = allTrips.filter((trip) => {
      const tripDepartureDate = new Date(trip.departureDate);
      const tripArrivalDate = new Date(trip.arrivalDate);

      const formattedDepartureDate = tripDepartureDate.toLocaleString();
      const formattedArrivalDate = tripArrivalDate.toLocaleString();

      return (
        formattedDepartureDate.includes(formattedSearchTerm) ||
        formattedArrivalDate.includes(formattedSearchTerm) ||
        trip.cityFrom.toLowerCase().includes(formattedSearchTerm) ||
        trip.cityTo.toLowerCase().includes(formattedSearchTerm) ||
        trip.availableSpace.toLowerCase().includes(formattedSearchTerm) ||
        trip.otherComments.toLowerCase().includes(formattedSearchTerm)
      );
    });

    setFilteredTrips(filtered);
  };

  useEffect(() => {
    handleSearch();
  }, [allTrips]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="banner-content" id="second-banner-top" sx={{ width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bannerBg})` }}>
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography gutterBottom variant="h4" id="banner-main-header" sx={{ letterSpacing: -5 }}>
              FIND A TRIP
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Need someone to take a parcel?
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center",}} className="trips-main-container">
        <Grid container spacing={0} className="trips-top-box">
          <Grid item xs={12} sm={12} md={7} className="trips-title-box" >
            <Typography
              variant="h4"
              className="trips-title"
              sx={{
                fontSize: "1.7em",
                fontWeight: 800,
                paddingTop: "1em",
                paddingLeft: "1em",
              }}
            >
              Available Trips
            </Typography>
            <Typography
              variant="subtitle1"
              className="trips-subtitle"
              sx={{
                paddingLeft: "1.5em",
                paddingBottom: "1em",
                lineHeight: "1.2",
              }}
            >
              Look through the trips below and find the one that best suits you!
              <br />
              You can also search if you need to.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={5} sx={{ padding: "1.5em" }} >
            <Box sx={{display: "flex"}} >
              <TextField
                sx={{
                  width: "80%",
                  fieldset: {
                    borderColor: "#D2B356",
                    "&:hover": { backgroundColor: "#fff", color: "#D2B356" },
                  },
                  margin: "1em",
                  marginRight: "0.5em",
                }}
                label="🔍 SEARCH HERE "
                size="small"
                placeholder="Search by city, date or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                variant="contained"
                sx={{
                  backgroundColor: "#D2B356",
                  margin: "1em",
                  marginLeft: 0,
                  "&:hover": { backgroundColor: "#fff", color: "#D2B356" },
                }}
              >
                SEARCH
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={0} sx={{ backgroundColor: "white", padding: "1em" }}>
          {filteredTrips.map((trip) => (
            <Grid item key={trip.id} xs={12} sm={6} md={4} xl={3} sx={{ padding: "1em" }}>
              <Card>
                <Grid container spacing={0} sx={{ }}>
                  <Grid item xs={4}>
                    <Img alt="no-profile-picture" src={"http://localhost:8000/" + userProfilePicture[trip.userId - 1]} />
                  </Grid>

                  <Grid item xs={8}>
                    <Typography  variant="subtitle1">
                      Posted by: {userFirstNames[trip.userId - 1]}
                    </Typography>
                    <Typography variant="body2"> From: {trip.cityFrom}</Typography>
                    <Typography  variant="body2">
                      {" "}
                      To: {trip.cityTo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Departure Date:
                      {formatDate(trip.departureDate)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Arrival Date:
                      {formatDate(trip.arrivalDate)}
                    </Typography>
                  </Grid>
                </Grid>

                <Box display="flex" justifyContent="center">
                    <TripDetails tripId={trip.id} />
                  </Box>

              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
