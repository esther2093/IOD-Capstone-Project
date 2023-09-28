import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ProfilePictureDialog from "./ProfilePictureDialog";
import { useUserContext } from "../context/UserContext";
import useTripData from "../hooks/useTripData";
import { Avatar, Grid } from "@mui/material";
import UpdateProfile from "./UpdateProfile";
import bannerBg from "../assets/bannerImage.jpg";
import formatDate from "./FormatDate";
import formatPNumber from "./FormatPNumber";
import useEnquiryData from "../hooks/useEnquirydata";
import TripsPanel from "./MyAccountTripsTabs";


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
          <Grid item className="my-acount-details" xs={12} sm={5} md={4} lg={3} xl={2.5}>
            <Paper square elevation={3} sx={{ m: "0.5em" }}>
              <Grid item>
                <Avatar
                  variant="square"
                  sx={{
                    width: "90%",
                    height: "90%",
                    py: "1em",
                    backgroundColor: "white",
                    m: "auto",
                  }}
                >
                  <img src={"http://localhost:8000/" + currentUser.profilePicture} width="100%" alt={"NO PROFILE PICTURE"} />
                </Avatar>
              </Grid>
              <Box>
                <ProfilePictureDialog />
              </Box>

              <Grid item sx={{ p: "1em" }}>
                <Typography variant="h6" className="section-subhead" sx={{ fontSize: "1em" }}>
                  ABOUT YOU
                </Typography>
                <Typography variant="h4" className="section-title" sx={{ fontSize: "1.7em", fontWeight: 800 }}>
                  Profile Details:
                </Typography>

                <Box sx={{ px: "2em", py: "1em" }}>
                  <Typography variant="body1" sx={{ fontSize: "0.9em" }}>
                    Name: {currentUser.firstName} {currentUser.lastName}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9em" }}>
                    Date of Birth: {formatDate(currentUser.dateOfBirth)}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9em" }}>
                    Email: {currentUser.email}
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: "0.9em" }}>
                    Phone number: {formatPNumber(currentUser.phoneNumber)}
                  </Typography>
                </Box>

                <Box>
                  <UpdateProfile />
                </Box>
              </Grid>
            </Paper>
          </Grid>

          <Grid item className="my-active-trips" xs={12} sm={12} md={8} lg={9} xl={9.5}>
            <TripsPanel />
          </Grid>

        </Grid>
      </Box>
    </Box>
  );
}
