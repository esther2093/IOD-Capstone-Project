import React from "react";
import Button from "@mui/material/Button";
import { Box, Typography, Divider } from "@mui/material";

export default function HomeBanner() {
  return (
    <Box className="banner-content" id="banner-top">
      <Box className="col-45">
        <Box className="banner-section-heading">
          <Typography variant="h4" className="breakline">
            —
          </Typography>
          <Typography variant="h1" id="homepage-main-header">
            SEND A PARCEL
          </Typography>
          <Typography variant="h2" id="homepage-main-subtitle">
            Send a parcel with someone who's already going the same way! Faster
            and more secure!
          </Typography>
          <Typography variant="h4" className="breakline">
            —
          </Typography>
        </Box>
        <Box className="button-group">
          <Button
            variant="outlined"
            sx={{
              width: "40%",
              fontWeight: "bold",
              border: 2,
              padding: 2,
              fontSize: 16,
            }}
            className="homepage-button"
            href="/rides"
          >
            SEND A PARCEL
          </Button>
          <Button
            variant="outlined"
            sx={{
              width: "40%",
              fontWeight: "bold",
              border: 2,
              padding: 2,
              fontSize: 16,
            }}
            className="homepage-button"
            href="/drive"
          >
            OFFER A DRIVE
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
