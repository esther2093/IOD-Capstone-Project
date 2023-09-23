import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axios from "axios";

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
    <div>
      <div className="banner-content" id="banner-top">
        <div className="col-45">
          <div className="banner-section-heading">
            <p className="breakline">—</p>
            <h2 id="drivePage-main-header">POST A TRIP</h2>
            <h3 id="ridesPage-main-subtitle">
              Going somewhere? Earn some extra cash on the way!
            </h3>
            <p className="breakline">—</p>
          </div>
        </div>
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ paddingBottom: "10em" }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="signup-logo-container">
              <Icon icon="solar:box-bold-duotone" height="41" />
              <img src={Logo} alt="Logo" className="login-logo" />
            </div>
            <Typography component="h4" className="login-subtitle">
              Please fill out your details below of your trip!
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Typography variant="body2" color="error">
                {error}
              </Typography>{" "}
              <Typography variant="body2" color="success">
                {submitResult}
              </Typography>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="depatureDate"
                    label="DD-MM-YYYY"
                    id="depatureDate"
                    format="DD-MM-YYYY"
                    helperText="Depature Date"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="otherComments"
                    label="Other comments"
                    id="otherComments"
                    autoComplete="otherComments"
                  />
                </Grid>
              </Grid>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                POST TRIP
              </Button>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </div>
  );
}
