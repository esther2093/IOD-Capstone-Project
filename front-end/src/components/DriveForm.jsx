import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axios from "axios"
import driveformpic from "../assets/driveformpic.jpeg"

export default function DriveForm() {
  const [error, setError] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const { currentUser, handleUpdateUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitResult("");

    const data = new FormData(event.currentTarget);
    const userId = currentUser.id;
    console.log(userId);
    data.append("userId", userId);

    axios
      .post(
        "http://localhost:8000/api/trips/register",
        Object.fromEntries(data.entries())
      )
      .then((response) => {
        const result = response.data.result;
        const trip = response.data.data;

        setSubmitResult(result);
        if (trip) {
          handleUpdateUser(user);
          navigate("/");
        } else {
          setError("Trip submission failed.");
        }
      })
      .catch((error) => {
        setError("There has been an error.");
        console.log(error);
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="banner-content" id="second-banner-top">
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography
              gutterBottom
              variant="h1"
              id="banner-main-header"
              sx={{ letterSpacing: -5 }}
            >
              GOING SOMEWHERE?
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Why not earn some extra cash on the way!
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container component="main" sx={{ padding: "1em", backgroundColor: "white"}}>
            <Grid
              item
              xs={null}
              sm={5}
              md={5}
              sx={{ display: { xs: "block", md: "flex" } }}
            >
              <img src={driveformpic} alt="car+parcels" className="drive-form-pic"></img>
            </Grid>

            <Grid item xs={12} sm={7} md={7}>
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box className="logo-container">
                  <Icon
                    icon="solar:box-bold-duotone"
                    height="41"
                    className="icon-parcel"
                  />
                  <img src={Logo} alt="Logo" className="login-logo" />
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 300, textAlign: "center" }}
                >
                  Fill out the details of your trip!
                </Typography>

                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 3, textAlign: "center" }}
                >
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                  <Typography variant="body2" color="success">
                    {submitResult}
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} sx={{ paddingRight: "1em"}}>
                      <TextField
                        required
                        fullWidth
                        id="cityFrom"
                        label="Subrub, City, State"
                        name="cityFrom"
                        autoComplete="cityFrom"
                        autoFocus
                        helperText="Where from?"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{ paddingRight: "1em"}}>
                      <TextField
                        required
                        fullWidth
                        id="cityTo"
                        label="Subrub, City, State"
                        name="cityTo"
                        autoComplete="cityTo"
                        helperText="Where to?"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{ paddingRight: "1em"}}>
                      <TextField
                        required
                        fullWidth
                        name="departureDate"
                        label="DD-MM-YYYY"
                        id="departureDate"
                        format="DD-MM-YYYY"
                        helperText="Departure Date"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} sx={{ paddingRight: "1em"}}>
                      <TextField
                        required
                        fullWidth
                        name="arrivalDate"
                        label="DD-MM-YYYY"
                        id="arrivalDate"
                        format="DD-MM-YYYY"
                        helperText="Arrival Date"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ paddingRight: "1em"}}>
                      <TextField
                        required
                        fullWidth
                        name="availableSpace"
                        label="Brief description of how much space you have in your car"
                        id="availableSpace"
                        autoComplete="availableSpace"
                        helperText="Available Space"
                      />
                    </Grid>
                    <Grid item xs={12} sx={{ paddingRight: "1em"}}>
                      <TextField
                        fullWidth
                        name="otherComments"
                        label="Other comments"
                        id="otherComments"
                        autoComplete="otherComments"
                      />
                    </Grid>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      margin: "4em 1em",
                      backgroundColor: "#D2B356",
                      "&:hover": {
                        backgroundColor: "#fff",
                        color: "#D2B356",
                        border: "none",
                      },
                    }}
                  >
                    POST TRIP
                  </Button>
                  </Grid>
                  
                </Box>
              </Box>
            </Grid>
          </Grid>
        </LocalizationProvider>
    </Box>
  );
}
