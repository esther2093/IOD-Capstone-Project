import React, { useState, useEffect } from "react";
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
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { OutlinedInput } from "@mui/material";
import bannerBg from "../assets/bannerImage.jpg";

export default function SignUpForm() {
  const { currentUser, handleUpdateUser } = useUserContext();

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitResult, setSubmitResult] = useState("");

  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post("http://localhost:8000/api/users/register", Object.fromEntries(data.entries()))
      .then((response) => {
        let user = response.data.data;
        //console.log(user);

        if (user) {
          handleUpdateUser(user);
          setError("")
          setSubmitResult("You have been successfully registered! We'll take you to your new MyAccount page");
          setTimeout(() => {
            navigate("/myaccount");
          }, 2000);
        }
      })
      .catch((error) => {
        setError (error.response.data.result);
        //console.log(error );
      });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="banner-content" id="second-banner-top" sx={{ width: "100%", backgroundSize:"cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bannerBg})` }}>
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography gutterBottom variant="h4" id="banner-main-header" sx={{ letterSpacing: -5 }}>
              JOINING THE FAMILY?
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Become a Parceler!
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

     
        <Container component="main" maxWidth="sm" sx={{ paddingBottom: "5em" }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box className="logo-container">
              <Icon icon="solar:box-bold-duotone" height="41" className="icon-parcel" />
              <img src={Logo} alt="Logo" className="login-logo" />
            </Box>
            <Typography variant="body2" sx={{ fontWeight: 300, textAlign: "center" }}>
              Please fill out your details below to join the ParcelMe party!
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Typography variant="body2" color="error" sx={{ textAlign: "center" }}>
                {error}
              </Typography>
              <Typography variant="body2" color="green" sx={{ textAlign: "center" }}>
                {submitResult}
              </Typography>
              <br />

              <Grid
                container
                spacing={2}
                sx={{
                  paddingRight: "1em",
                  fieldset: {
                    borderColor: "#D2B356",
                    "&:hover": { backgroundColor: "#fff", color: "#D2B356" },
                  },
                }}
              >
                <Grid item xs={12} sm={6}>
                  <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
                </Grid>
                <Grid item xs={12}>
                  <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    fullWidth
                  >
                    <InputLabel htmlFor="password" required>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="password"
                      name="password"
                      label="Password*"
                      autoComplete="password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton aria-label="toggle password visibility" onClick={handleShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth name="dateOfBirth" label="DD-MM-YYYY" id="dateOfBirth" format="DD-MM-YYYY" />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField required fullWidth id="phoneNumber" label="Phone Number" name="phoneNumber" autoComplete="phone-number" />
                </Grid>

                <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  type="submit"
                  variant="filled"
                  sx={{
                    width: "50%",
                    my: "2em",
                  }}
                >
                  Sign Up
                </Button>
                </Grid>
                
              </Grid>

              <Box display="flex" justifyContent="center" sx={{ marginBottom: "4.7em" }}>
                <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                  <Typography variant="body2">Already have an account?</Typography>
                  <Link href="/login" variant="body2">
                    Log in HERE!
                  </Link>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
    </Box>
  );
}
