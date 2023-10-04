import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import useTripData from "../hooks/useTripData";
import Box from "@mui/system/Box";
import { TextField, styled } from "@mui/material";
import useUserData from "../hooks/useUserData";
import TripDetails from "./TripDetails";
import bannerBg from "../assets/bannerImage.jpg";
import FormatDate from "./FormatDate";
import Skeleton from "@mui/material/Skeleton";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "90%",
  maxHeight: "90%",
  padding: "0.25em",
});

export default function TripsList() {
  const { allTrips, loading } = useTripData();
  const { users } = useUserData();

  const [filteredTrips, setFilteredTrips] = useState(allTrips);
  const [searchTerm, setSearchTerm] = useState("");
  const [userFirstNames, setUserFirstNames] = useState([]);
  const [userProfilePicture, setUserProfilePictures] = useState([]);

   //extract first names and profile pictures and store it into arrays
  useEffect(() => {
    const firstNamesArray = users.map((user) => user.firstName);
    setUserFirstNames(firstNamesArray);
    const profilePictureArray = users.map((user) => user.profilePicture);
    setUserProfilePictures(profilePictureArray);
  }, [users]);

  //filter trips based on search terms and update the list shown 
  useEffect(() => {
    //making search case-insensitive 
    const formattedSearchTerm = searchTerm.toLowerCase();

    //filtering map based on search criterias 
    const filtered = allTrips.filter((trip) => {
      return (
        FormatDate(trip.departureDate).includes(formattedSearchTerm) ||
        FormatDate(trip.departureDate).includes(formattedSearchTerm) ||
        trip.cityFrom.toLowerCase().includes(formattedSearchTerm) ||
        trip.cityTo.toLowerCase().includes(formattedSearchTerm) ||
        trip.availableSpace.toLowerCase().includes(formattedSearchTerm) ||
        trip.price.includes(formattedSearchTerm)||
        trip.comments.toLowerCase().includes(formattedSearchTerm)
      );
    });

    //sort filtered trips by closest depature date first 
    filtered.sort((a, b) => new Date(a.departureDate) - new Date(b.departureDate));
    setFilteredTrips(filtered);
  }, [allTrips, searchTerm]);

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

      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column", alignItems: "center" }} className="trips-main-container">
        <Grid container spacing={0} className="trips-top-box">
          <Grid item xs={12} sm={12} md={8} className="trips-title-box">
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
              Look through the trips below and find the one that will work for you!
            </Typography>
          </Grid>

          <Grid item xs={12} sm={12} md={4} sx={{ padding: "1.5em" }}>
            <Box sx={{ display: "flex" }}>
              <TextField
                fullWidth
                label="🔍 SEARCH HERE "
                placeholder="Search by city, date, or description"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={0} sx={{ backgroundColor: "white", padding: "1em", minHeight:"430px" }}>
          {loading ? (
            Array.from({ length: 6 }, (_, index) => (
              <Grid item key={index} xs={12} sm={6} md={4} xl={4} sx={{ p: "0.5em" }}>
                <Card>
                  <Grid container spacing={0} sx={{ marginTop: "0.5em" }}>
                    <Grid item xs={4}>
                      <Skeleton variant="rectangular" width={"auto"} height={90} sx={{ m: "0.5em" }} />
                    </Grid>
          
                    <Grid item xs={8}>
                      <Skeleton variant="rectangular" width={"auto"} height={90} sx={{ m: "0.5em" }} />
                    </Grid>
                  </Grid>
          
                  <Box display="flex" sx={{ justifyContent: "right" }}>
                    <Skeleton variant="rounded" width={50} height={20} sx={{ m: "0.5em" }} />
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            filteredTrips.map((trip) => (
              <Grid item key={trip.id} xs={12} sm={6} md={4} xl={4} sx={{ padding: "1em" }}>
                <Card>
                  <Grid container spacing={0} sx={{ marginTop: "0.5em" }}>
                    <Grid item xs={4} sx={{ padding: "0.5em", margin: "auto" }}>
                      <Img alt="no-profile-picture" src={userProfilePicture[trip.userId - 1]} />
                    </Grid>

                    <Grid item xs={8} sx={{ padding: "0.5em" }}>
                      <Typography variant="body2"> From: {trip.cityFrom}</Typography>
                      <Typography variant="body2"> To: {trip.cityTo}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: "0.2em" }}>
                        Departing: {FormatDate(trip.departureDate)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: "0.2em" }}>
                        Arriving: {FormatDate(trip.arrivalDate)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: "0.2em" }}> 
                      Starting price: ${trip.startingPrice}</Typography>
                      <Typography variant="body2" sx={{ fontSize: "0.8em" }}>
                        Parceler: {userFirstNames[trip.userId - 1]}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Box display="flex" sx={{ margin: "0 0.5em 0.5em 0.5em" }}>
                    <TripDetails tripId={trip.id} />
                  </Box>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </Box>
  );
}
