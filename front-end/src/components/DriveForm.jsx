import React from "react";
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

export default function DriveForm () {
  const [value, setValue] = React.useState(dayjs("null"));
  const [error, setError] = React.useState("");
  const [submitResult, setSubmitResult] = React.useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const selectedDate = value.toDate();
    const currentDate = new Date();
    const age = currentDate.getFullYear() - selectedDate.getFullYear();

    if (userPassword.length < 6) {
      setError("Password must be at least 6 characters long.");
    } else if (userPassword === userEmail) {
      setError("Password must not match the email address");
    } else if (age < 18) {
      setError("You must be at least 18 years old to sign up.");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userEmail)) {
      setError("Invalid email address.");
    } else {
      setError(""); // Reset error message
      setSubmitResult("Your all wrapped up! Welcome to the family!");

      window.location.href = "/login"; 
    }
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
                <Grid item xs={12} >
                  <TextField
                    required
                    fullWidth
                    id="cityFrom"
                    label="Where from?"
                    name="cityFrom"
                    autoComplete="cityFrom"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="cityTo"
                    label="Where to?"
                    name="cityTo"
                    autoComplete="cityTo"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DateField
                    required
                    fullWidth
                    label="Depature date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    format="DD-MM-YYYY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                <DateField
                    required
                    fullWidth
                    label="Arrival date"
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                    format="DD-MM-YYYY"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="availableSpace"
                    label="Available space"
                    id="availableSpace"
                    autoComplete="availableSpace"
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
