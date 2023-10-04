import React from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import Parcels from "../assets/parcels.jpg";

export default function Services() {
  
  return (
    <Paper square elevation={0} className="services-section" id="services-top">
      <Box className="services-container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className="parcel-pic" sx={{ textAlign: "center" }}>
            <img src={Parcels} alt="Parcel" className="services-parcel-pic" />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ paddingRight: "1em" }}>
            <Box className="section-heading">
              <Typography variant="h6" className="section-subhead" sx={{ fontSize: "1em" }}>
                SERVICES
              </Typography>
              <Typography variant="h4" className="section-title" sx={{ fontSize: "1.7em", fontWeight: 800 }}>
                How does it work?
              </Typography>
              <Typography variant="subtitle1" className="section-subtitle">
                Follow these instructions:
              </Typography>
            </Box>

            <Box sx={{padding: "1em"}}>
              <Typography variant="body1">Wanting to send a parcel?</Typography>
              <ol className="services-instructions">
                <li>Login or Sign-up</li>
                <li>Browse through the posted trips in the SEND section</li>
                <li>If you find a trip that you would like to use, send a request to the parceler and wait for approval.</li>
                <li>If your request is accepted then get chatting with the parceler to organise logistics and price</li>
              </ol>
              <Typography variant="body1">Wanting to post a trip?</Typography>
              <ol className="services-instructions">
                <li>Login or Sign-up</li>
                <li>Head to the DRIVE section and fill out the details of your trip</li>
                <li>If someone requests a ParcelMe approve or decline the request in your MyAccount page</li>
                <li>If you approve the request you can start chatting with the parceler to organise cost and logistics</li>
              </ol>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
