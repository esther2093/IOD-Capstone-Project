import React from "react";
import Button from "@mui/material/Button";
import { Box, Typography, Divider, ButtonGroup } from "@mui/material";
import bannerBg from "../assets/bannerImage.jpg";


export default function HomeBanner() {
  return (
    <Box className="banner-content" id="banner-top" sx={{ width: "100%", backgroundSize:"cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bannerBg})` }}>
      <Box className="banner-section-box">
        <Box className="banner-section-heading">
          <Typography variant="h4" className="breakline">
            —
          </Typography>
          <Typography
            variant="h1" 
            gutterBottom
            id="homepage-main-header"
            sx={{ letterSpacing: -5 }}
          >
            WANT TO SEND A PARCEL?
          </Typography>
          <Typography variant="subtitle1" id="homepage-main-subtitle">
            Send a parcel with someone who's already going the same
            <br />
            way! Faster, cheaper and more secure!
          </Typography>
          <Typography variant="h4" className="breakline">
            —
          </Typography>
        </Box>

        <Box className="banner-button-group">
          <ButtonGroup
            variant="text"
            aria-label="text button group"
            sx={{ textAlign: "center" }}
          >
            <Button
              variant="outlined"
              sx={{
                fontWeight: "bold",
                border: 0,
                fontSize: "1.2em",
              }}
              className="homepage-button"
              href="/trips"
            >
              SEND A PARCEL
            </Button>
            <Button
              variant="outlined"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2em",
                border: 0,
              }}
              className="homepage-button"
              href="/drive"
            >
              OFFER A DRIVE
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  );
}
