import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useTripData from "../hooks/useTripData";
import Box from "@mui/system/Box";
import { Button, ButtonBase, TextField } from "@mui/material";
import useUserData from "../hooks/useUserData";

export default function TripsList() {
    const { allTrips } = useTripData();
  const { users } = useUserData();

  const [filteredTrips, setFilteredTrips] = useState(allTrips);
  const [searchTerm, setSearchTerm] = useState("");

  const [userFirstNames, setUserFirstNames] = useState([]);

  useEffect(() => {
    const firstNamesArray = users.map((user) => user.firstName);
    setUserFirstNames(firstNamesArray);
    console.log("Users:", users); 
    console.log("First Names:", firstNamesArray); 
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

      <Box sx={{ flexGrow: 1 }} className="trips-main-container">
        <Grid container spacing={2} className="trips-top-box">
          <Grid
            item
            xs={12}
            sm={7}
            className="trips-title-box"
            sx={{ paddingRight: "1em" }}
          >
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

          <Grid
            item
            xs={12}
            sm={5}
            sx={{ padding: "1.5em", marginTop: "2em" }}
            justifyContent="end"
          >
            <Box display="flex" justifyContent="center">
              <TextField
                sx={{
                  width: "25em",
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

          <Grid container sx={{ backgroundColor: "white", padding: "1em" }}>
            {filteredTrips.map((trip) => (
              <Grid
                item
                key={trip.id}
                xs={12}
                sm={6}
                md={4}
                sx={{ padding: "1em" }}
              >
                <Card>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src="/static/images/grid/complex.jpg" />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Typography variant="body2" gutterBottom>
                Full resolution 1920x1080 • JPEG
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ID: 1030114
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ cursor: 'pointer' }} variant="body2">
                Remove
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              $19.00
            </Typography>

            </Grid> 
            </Grid>


                  <CardContent>
                    <Typography variant="h6"> From: {trip.cityFrom}</Typography>
                    <Typography variant="h6"> To: {trip.cityTo}</Typography>
                    <Typography variant="body2">
                      Departure Date:
                      {new Date(trip.departureDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">
                      Arrival Date:
                      {new Date(trip.arrivalDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1">
                      Posted by: {userFirstNames[trip.userId - 1]}
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
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
