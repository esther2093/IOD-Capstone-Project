import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useTripData from "../hooks/useTripData";
import { Container, Typography, Button } from "@mui/material";


function TripDetails() {
  const { id } = useParams();
  const { tripData, error } = useTripData(id); // Include an error property

  if (error) {
    return <div>Error: {error.message}</div>; // Display the error message
  }

  if (!tripData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Typography variant="h4">
        {tripData.cityFrom} to {tripData.cityTo}
      </Typography>
      <Typography variant="h6">
        Departure Date: {tripData.departureDate}
      </Typography>
      <Typography variant="h6">Arrival Date: {tripData.arrivalDate}</Typography>
      <Typography variant="body1">
        Available Space: {tripData.availableSpace}
      </Typography>
      <Typography variant="body1">
        Other Comments: {tripData.otherComments}
      </Typography>
      {/* You can add more trip details here as needed */}
      <Button variant="contained" onClick={() => history.goBack()}>
        Back to Trips
      </Button>
    </Container>
  );
}

export default TripDetails;
