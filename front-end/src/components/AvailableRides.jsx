import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import useTripData from "../hooks/useTripData";
import Box from '@mui/system/Box';
import { Divider } from "@mui/material";

function TripList() {
  const { allTrips } = useTripData(); 
  const [filteredTrips, setFilteredTrips] = useState(allTrips);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    const formattedSearchTerm = searchTerm.toLowerCase();

    const filtered = allTrips.filter((trip) => {
      const tripDepartureDate = new Date(trip.depatureDate);
      const tripArrivalDate = new Date(trip.arrivalDate);
    
      // Format the trip dates
      const formattedDepartureDate = `${tripDepartureDate.getDate()}/${tripDepartureDate.getMonth() + 1}/${tripDepartureDate.getFullYear()}`;
      const formattedArrivalDate = `${tripArrivalDate.getDate()}/${tripArrivalDate.getMonth() + 1}/${tripArrivalDate.getFullYear()}`;
    
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
       <Box className="banner-content" id="banner-top">
          <Box className="col-45">
            <Box className="banner-section-heading">
            <p className="breakline">—</p>
          <Typography variant="h4" id="ridePage-main-header">
            FIND A TRIP
          </Typography>
          <Typography variant="h6" id="ridePage-main-subtitle">
            Going somewhere? Earn some extra cash on the way!
          </Typography>
          <p className="breakline">—</p>
        </Box>
      </Box>
    </Box>

      <Grid container spacing={2} sx={{backgroundColor: "white", padding: 2, textAlign: "right"}}>
        <input
          type="text"
          placeholder="Search by name, location, or other criteria"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>SEARCH</button>
      </Grid>
      <Typography variant="h5">Available Trips</Typography>
      <Grid container spacing={2} rowSpacing={2} sx={{backgroundColor: "white"}}>
        {filteredTrips.map((trip) => (
          <Grid item key={trip.id} xs={12} sm={6} md={3} sx={{ paddingRight: 2, paddingBottom: 2 }}>
            <Card>
              <CardContent>
                <Typography variant="h5">{trip.cityFrom}</Typography>
                <Typography variant="h6">{trip.cityTo}</Typography>
                <Typography variant="body2">
                  Departure Date: {new Date(trip.depatureDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Arrival Date: {new Date(trip.arrivalDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2">
                  Available Space: {trip.availableSpace}
                </Typography>
                <Typography variant="body2">
                  Other Comments: {trip.otherComments}
                </Typography>
                <Typography variant="body2">
                  Poster: {trip.userId}
                </Typography>
                <Link to={`/trip/${trip.id}`} style={{ textDecoration: "none" }}>
                  <button>More Details</button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TripList;
