import React, { useEffect, useState } from "react";
import useTripData from "../hooks/useTripData";
import { Typography, Button, Card, CardContent, Box, Grid } from "@mui/material";
import useUserData from "../hooks/useUserData";
import { Link, useParams } from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

function TripDetails() {
  const { id } = useParams();
  const { idTrip } = useTripData(id);
  const { users } = useUserData();

  console.log(idTrip);

  if (!idTrip) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <Box className="banner-content" id="second-banner-top">
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography gutterBottom variant="h4" id="banner-main-header" sx={{ letterSpacing: -5 }}>
              DETAILS
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Check out the trip details
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box>
        <Grid container spacing={0}>
          <Grid item xs={10}>
            <Typography variant="h1" id="banner-main-subtitle" sx={{ p: '1em'}}>
              Trip Details:
            </Typography>
          </Grid>

          <Grid item xs={2}>
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
              onClick={() => history.goBack()}
            >
              {" "}
              GO BACK
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h6">
            From: {idTrip.suburbFrom}, {idTrip.cityFrom}, {idTrip.stateFrom}
          </Typography>
          <Typography variant="h6">
            To: {idTrip.suburbTo}, {idTrip.cityTo}, {idTrip.stateTo}
          </Typography>
          <Typography variant="body2">
            Date: {formatDate(idTrip.departureDate)} - {formatDate(idTrip.arrivalDate)}
          </Typography>
          <Typography variant="body2">Space: {idTrip.availableSpace}</Typography>
          <Typography variant="body2">Comments: {idTrip.comments}</Typography>

          <Box display="flex" justifyContent="center">
            <Link to={"/"} style={{ textDecoration: "none" }}>
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
                PARCELME
              </Button>
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TripDetails;
