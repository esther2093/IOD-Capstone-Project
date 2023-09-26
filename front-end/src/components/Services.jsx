import React from "react";
import { Box, Typography, Divider, Grid, Paper } from "@mui/material";
import Parcels from "../assets/parcels.jpg";

export default function Services() {
  return (
    <Paper square elevation={0} className="services-section" id="services-top">
      <Box className="services-container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} className="parcel-pic" sx={{ textAlign: "center"}}>
            <img src={Parcels} alt="Parcel" className="services-parcel-pic"/>
          </Grid>

          <Grid item xs={12} sm={6} sx={{paddingRight: "1em"}}>
            <Box className="section-heading"> 
            <Typography variant="h6" className="section-subhead" sx={{fontSize: "1em"}}>
              SERVICES
              </Typography>
              <Typography variant="h4" className="section-title" sx={{fontSize: "1.7em", fontWeight: 800}}>
                How does it work?
              </Typography>
              <Typography variant="subtitle1" className="section-subtitle" >
                Follow these instructions:
              </Typography>
            </Box>
            <ol className="services-instructions">
              <li>Login or Sign-up.</li>
              <li>Look through available trips in the SEND section.</li>
              <li>Contact the driver to organize logistics.</li>
              <li>
                If you are going somewhere and would like to take an item,
                <br />post your trip in the DRIVE section.
              </li>
            </ol>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
