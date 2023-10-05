import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ProfilePictureDialog from "./ProfilePictureDialog";
import { useUserContext } from "../context/UserContext";
import { Avatar, Grid } from "@mui/material";
import UpdateProfile from "./UpdateProfileDialog";
import bannerBg from "../assets/bannerImage.jpg";
import TripsPanel from "./MyAccountTripsTabs";
import FormatDate from "./FormatDate";
import FormatPNumber from "./formatPNumber";


export default function MyAccount() {
  const { currentUser } = useUserContext();

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <Box className="banner-content" id="second-banner-top" sx={{ width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bannerBg})` }}>
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography gutterBottom variant="h4" id="banner-main-header" sx={{ letterSpacing: -5 }}>
              MY ACCOUNT
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              All your details for you to see
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", p: "0.5em" }}>
        <Grid container spacing={0} className="my-account-box">
          <Grid item className="my-acount-details" xs={12} sm={12} md={12} lg={3} xl={2.5}>
            <Paper square elevation={3} sx={{ m: "0.5em", display: "flex" }}>
              <Grid container>
              <Grid item xs={12} sm={5} md={4} lg={12} sx={{padding: "1em"}}>
                <Avatar
                  variant="square"
                  sx={{
                    width: "90%",
                    height: "90%",
                    backgroundColor: "white",
                    m: "auto",
                  }}
                >
                  <img src={currentUser.profilePicture} width="100%" alt={"NO PROFILE PICTURE"} />
                </Avatar>

                <Box>
                  <ProfilePictureDialog />
                </Box>
              </Grid>

              <Grid item sx={{ p: "1em" }} xs={12} sm={7} md={8} lg={12}>
                <Typography variant="h6" className="section-subhead" sx={{ fontSize: "1em" }}>
                  ABOUT YOU
                </Typography>
                <Typography variant="h4" className="section-title" sx={{ fontSize: "1.7em", fontWeight: 800 }}>
                  Profile Details:
                </Typography>

                <Box sx={{ px: "1em", py: "1em" }}>
                  <Typography variant="body1" sx={{ fontSize: "0.9em", pb: "0.5em" }}>
                    Name: {currentUser.firstName} {currentUser.lastName}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9em", pb: "0.5em"  }}>
                    Date of Birth: {FormatDate(currentUser.dateOfBirth)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9em", pb: "0.5em"  }}>
                    Email: {currentUser.email}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9em", pb: "0.5em"  }}>
                    Phone number: {FormatPNumber(currentUser.phoneNumber)}
                  </Typography>
                </Box>

                <Box>
                  <UpdateProfile />
                </Box>
              </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item className="my-active-trips" xs={12} sm={12} md={12} lg={9} xl={9.5}>
            <TripsPanel />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
