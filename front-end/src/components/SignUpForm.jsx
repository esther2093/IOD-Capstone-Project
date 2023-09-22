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
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

export default function SignUpForm() {

  const [error, setError] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [result, setResult] = React.useState('');
  const { currentUser, handleUpdateUser } = useUserContext();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const userFirstName = data.get("firstName");
    const userLastName = data.get("lastName");
    const userPassword = data.get("password");
    const userEmail = data.get("email");
    const userPhoneNumber = data.get("phoneNumber");
  
    const selectedDate = value.toDate();
    const currentDate = new Date();
    const age = currentDate.getFullYear() - selectedDate.getFullYear();
  
    if (userPassword.length < 6) {
      setError("Password must be at least 6 characters long");
    } else if (userPassword === userEmail) {
      setError("Password must not match the email address");
      // } else if (!/^(?=.*[A-Z])(?=.*\d).+/.test(userPassword)) {
      //   setError("Password must include a capital letter and a number.");
    } else if (!/^[A-Za-z]+$/i.test(userFirstName)) {
      setError("Invalid first name");
    } else if (!/^[A-Za-z]+$/i.test(userLastName)) {
      setError("Invalid last name");
    // } else if (age < 18) {
    //   setError("You must be over 18 years old to sign up");
    // } else if (userPhoneNumber.length < 10) {
    //   setError("You must input a valid phone number");
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(userEmail)) {
      setError("Invalid email address");
    } else {
      setError("");
  
      // convert form data to object and post to backend
      axios
        .post("http://localhost:8000/api/users/register", Object.fromEntries(data.entries()))
        .then((response) => {
          let result = response.data.result;
          let user = response.data.data;
          console.log(user);
  
          setResult(result);
          if (user) {
            handleUpdateUser(user);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          setResult("There has been an error");
        });
    }
  };
  

  return (
    <div>
      <div className="banner-content" id="banner-top">
        <div className="col-45">
          <div className="banner-section-heading">
            <p className="breakline">—</p>
            <h2 id="signup-main-header">JOIN THE FAMILY</h2>
            <h3 id="signup-main-subtitle">
              Looking to ship? 
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
              Please fill out your details below to join the party!
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
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel htmlFor="password" required>
                      Password
                    </InputLabel>
                    <FilledInput
                      id="password"
                      name="password"
                      autoComplete="password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="dateOfBirth"
                    label="DD-MM-YYYY"
                    id="dateOfBirth"
                    format="DD-MM-YYYY"
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    autoComplete="phone-number"
                  />
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "left" }}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label={
                      <Typography sx={{ fontSize: "0.7em" }}>
                        I want to receive inspiration, marketing promotions and
                        updates via email.
                      </Typography>
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </LocalizationProvider>
    </div>
  );
}
