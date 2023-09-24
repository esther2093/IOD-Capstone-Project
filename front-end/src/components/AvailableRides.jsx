import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from '@mui/system/Box';

function TripList() {
  const [allTrips, setAllTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trip data
        const tripResponse = await fetch("http://localhost:8000/api/trips");
        const tripResult = await tripResponse.json();
        if (tripResult.data) {
          setAllTrips(tripResult.data);
          setFilteredTrips(tripResult.data);
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = allTrips.filter((trip) => {
      return (
        trip.cityFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.cityTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.depatureDate.includes(searchTerm) ||
        trip.arrivalDate.includes(searchTerm) ||
        trip.availableSpace.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.otherComments.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredTrips(filtered);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{backgroundColor: "white", padding: 2, textAlign: "right"}}>
        <input
          type="text"
          placeholder="Search by name, location, or other criteria"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>SEARCH</button>
      </Grid>
      <Typography variant="h5">Available Trips </Typography>
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
