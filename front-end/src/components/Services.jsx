import React from "react";
import { Box, Typography, Divider, Grid, Paper } from "@mui/material";
import Parcels from "../assets/parcels.jpg";

export default function Services() {
  return (
    <Paper square elevation={0} className="services-section" id="services-top">
      <Box className="services-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} className="parcel-pic">
            <img src={Parcels} alt="Parcel" />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box className="section-heading">
              <Typography variant="h6" className="section-subhead">
                SERVICES
              </Typography>
              <Typography variant="h4" className="section-title">
                How does it work?
              </Typography>
              <Divider className="breakline" />
              <Typography variant="subtitle1" className="section-subtitle">
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
