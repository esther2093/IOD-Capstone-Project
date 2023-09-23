import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


function TripList() {
  const [allTrips, setAllTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const data = [];
  
      try {
        const response = await fetch("http://localhost:8000/api/trips");
        const result = await response.json();
  
        if (result.trips) {
          data.push(...result.trips);
        }
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
  
      setAllTrips(data);
      setFilteredTrips(data); 
    };
  
    fetchData();
  }, []);
  

  const handleSearch = () => {
    const filtered = allTrips.filter((trip) => {
      return (
        trip.cityFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.cityTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.depatureDate.includes(searchTerm) || // Assuming searchTerm matches the date format
        trip.arrivalDate.includes(searchTerm) ||   // Assuming searchTerm matches the date format
        trip.availableSpace.toLowerCase().includes(searchTerm.toLowerCase()) ||
        trip.otherComments.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  
    setFilteredTrips(filtered);
  };
 

  return (
    <Container component="main" style={{ minWidth: "100vw", minHeight: "100vh" }}>
      <div className="fullTripListbody">
        <div className="searchForm">
          <input
            className="searchFormInput"
            type="text"
            placeholder="Search by name, location, or other criteria"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="searchButton" onClick={handleSearch}>
            SEARCH
          </button>
        </div>
        <Grid container spacing={2} sx={{ margin: "0", marginBottom: "1em" }}>
          {filteredTrips.map((trip) => (
            <Grid item key={trip.id} xs={12} sm={6} md={3}>
              <Link to={`/trip/${trip.id}`}>
                <Card sx={{ width: "90%", height: "100%", padding: "0" }}>
                  <CardContent>
                    <img
                      className="tripThumbnail"
                      src={trip.image} // Replace with your trip image field
                      alt={trip.name}
                    />
                    <Typography variant="h5" component="div">
                      {trip.name}
                    </Typography>
                    <Typography variant="body2">
                      Location: {trip.location}
                    </Typography>
                    {/* Add more trip information fields here */}
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}

export default TripList;
