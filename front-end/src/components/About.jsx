import React from "react";
import { Icon } from "@iconify/react";
import { Box, Typography, Grid, Paper } from "@mui/material";

export default function About() {
  return (
    <Paper square elevation={0} className="about-section" id="about-top">
      <Box className="section-container">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} className="about-col-33" sx={{paddingRight: "1em"}} >
            <Box className="section-box">
              <Typography variant="h6" className="section-subhead" sx={{fontSize: "1em"}}>
                ABOUT US
              </Typography>
              <Typography variant="h4" className="section-title" sx={{fontSize: "1.7em", fontWeight: 800}}>
                Why Use ParcelMe?
              </Typography>
              <Typography variant="subtitle1" className="section-subtitle" >
                We offer an easy way to get in contact with people who are on
                their way somewhere and you can ask them to deliver a package
                for you!
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8} className="icon-block-66">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6} sx={{paddingRight: "1em", paddingBottom: "1em"}} >
                <Paper elevation={0} className="icon-block">
                  <Icon
                    className="icon-block-icon" 
                    icon="fluent:text-abc-underline-double-32-filled"
                    width="35"
                  />
                  <Box className="icon-block-description">
                    <Typography variant="h6">SIMPLE</Typography>
                    <Typography variant="body2">
                      Simple setup of posting your travels to be a driver or for
                      the sender to see available routes
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} sx={{paddingRight: "1em", paddingBottom: "1em"}}>
                <Paper elevation={0} className="icon-block">
                  <Icon className="icon-block-icon" icon="clarity:lightning-line" />
                  <Box className="icon-block-description">
                    <Typography variant="h6">CONVENIENT</Typography>
                    <Typography variant="body2">
                      Choose the time and date that best suits you and contact
                      the driver directly once you are matched
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6} sx={{paddingRight: "1em", paddingBottom: "1em"}}>
                <Paper elevation={0} className="icon-block">
                  <Icon className="icon-block-icon" icon="nimbus:money" width="33"/>
                  <Box className="icon-block-description">
                    <Typography variant="h6">AFFORDABLE</Typography>
                    <Typography variant="body2">
                      Costs vary based on kms and size of items being delivered
                      and will be more cost-efficient due to the driver going
                      that way anyways
                    </Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12}  md={6} sx={{paddingRight: "1em", paddingBottom: "1em"}}>
                <Paper elevation={0} className="icon-block">
                  <Icon
                    className="icon-block-icon"
                    icon="mingcute:phone-fill"
                  />
                  <Box className="icon-block-description">
                    <Typography variant="h6">CONTACT US</Typography>
                    <Typography variant="body2">Contact us if there are any issues</Typography>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}
