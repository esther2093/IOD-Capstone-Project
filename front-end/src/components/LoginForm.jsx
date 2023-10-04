import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../context/UserContext";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import { OutlinedInput } from "@mui/material";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import bannerBg from "../assets/bannerImage.jpg";

export default function LoginForm() {
  const { currentUser, handleUpdateUser } = useUserContext();

  const [loggedIn, setLoggedIn] = useState(currentUser.email);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleLoginSuccess = (loggedInUser) => {
    setError("");
    handleUpdateUser(loggedInUser);
    setLoggedIn(true);

    setTimeout(() => {
      navigate("/myaccount");
    }, 3000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const data = new FormData(event.currentTarget);

    let userEmail = data.get("email");
    let userPassword = data.get("password");

    try {
      let response = await axios.post("/api/users/login", {
        email: userEmail,
        password: userPassword,
      });

      if (response.data.result === "User successfully logged in") {
        handleLoginSuccess(response.data.data);
      }
    } catch (error) {
      setError(error.response.data.result);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box className="banner-content" id="second-banner-top" sx={{ width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bannerBg})` }}>
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography gutterBottom variant="h1" id="banner-main-header" sx={{ letterSpacing: -5 }}>
              LOG IN
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Login with your details below
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container component="main" sx={{ padding: "1em" }}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={6}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "block", md: "flex" },
          }}
        />

        <Grid item xs={12} sm={6} md={5}>
          <Box
            sx={{
              my: 13,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box className="logo-container">
              <Icon icon="solar:box-bold-duotone" height="41" className="icon-parcel" />
              <img src={Logo} alt="Logo" className="login-logo" />
            </Box>

            {loggedIn ? (
              <Box sx={{ textAlign: "center" }}>
                <Box
                  sx={{
                    fontSize: "250%",
                    marginTop: "1.5em",
                    marginBottom: "-1.15em",
                    zIndex: 2,
                    color: "#D2B356",
                  }}
                >
                  <Icon icon="emojione-monotone:ribbon" className="login-welcome-icon" />
                </Box>
                <Box sx={{ textAlign: "center", justifyContent: "center", display: "flex", mb: "1em" }}>
                  <Box sx={{ justifyContent: "center", display: "flex", width: "45%", whiteSpace: "nowrap", borderTop: "0.15em solid #D2B356", borderBottom: "0.15em solid #D2B356" }}>
                    <Typography
                      component="h1"
                      variant="h6"
                      className="welcome-message-login"
                      sx={{
                        fontFamily: "Qwitcher Grypen",
                        fontSize: "300%",
                      }}
                    >
                      Welcome back {currentUser.firstName}!
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 300,
                    margin: "2em 1em 3em 1em",
                    textAlign: "center",
                  }}
                >
                  You will be redirected to your MyAccount page in a moment...
                </Typography>

                <Button
                  onClick={() => {
                    handleUpdateUser({});
                    setLoggedIn(false);
                  }}
                  variant="contained"
                  sx={{
                    backgroundColor: "#D2B356",
                    width: "50%",
                    "   &:hover": {
                      backgroundColor: "#fff",
                      color: "#D2B356",
                      border: "none",
                    },
                    mt: "1.5em",
                    mb: "3em",
                  }}
                  className="logout-button"
                >
                  LOG OUT
                </Button>
              </Box>
            ) : (
              <Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ fontWeight: 300 }}>
                    Login with your details below
                  </Typography>
                  <Typography variant="body2" color="error" sx={{ pt: "1em" }}>
                    {error}
                  </Typography>
                </Box>

                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    my: "2.8em",
                  }}
                >
                  <TextField sx={{pb: "0.5em"}}margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                  <FormControl fullWidth>
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
                          <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
                    <Button
                      type="submit"
                      variant="filled"
                      sx={{
                        mt: 3,
                        mb: 2,
                        width: "50%",
                      }}
                    >
                      LOG IN
                    </Button>
                  </Grid>
                </Box>

                <Grid container sx={{ m: "0.5em", display: "flex", justifyContent: "center", textAlign: "center" }}>
                  <Grid item xs={6}>
                    <Link href="/forgot" variant="body2">
                      Forgot Password?
                    </Link>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" sx={{}}>
                      New to ParcelMe?
                    </Typography>
                    <Link href="/signup" variant="body2">
                      <Typography variant="body2">Join HERE!</Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
