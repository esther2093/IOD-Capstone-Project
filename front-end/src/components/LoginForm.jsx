import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
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
  // console.log(currentUser);

  const [loggedIn, setLoggedIn] = React.useState(currentUser.email);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [loginAttempts, setLoginAttempts] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(null);
  const [lockedOut, setLockedOut] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {event.preventDefault()};

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      clearTimeout(lockoutTimer);
    };
  }, [lockoutTimer]);


  const handleLoginFailure = () => {
    let newAttempts = loginAttempts + 1;

    if (newAttempts === 5) {
      setLockedOut(true); 
      setErrorMsg("Maximum login attempts exceeded. Please try again later.");

      const lockoutTimerId = setTimeout(() => {
        setLoginAttempts(0); // Reset login attempts after lockout duration
        setErrorMsg("");
        setLockedOut(false); // Reset lockout status
      }, 5 * 60 * 100 );

      setLockoutTimer(lockoutTimerId);
    } else {
      setErrorMsg("Unsuccessful login " + (5 - newAttempts) + " attempts remaining");
    }
    setLoginAttempts(newAttempts);
    setLoggedIn(false);
  };

  const handleLoginSuccess = (loggedInUser) => {
    setErrorMsg("");
    handleUpdateUser(loggedInUser);
    setLoggedIn(true);

    setTimeout(() => {
      navigate("/");
    }, 4000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg("");

    const data = new FormData(event.currentTarget);

    let userEmail = data.get("email");
    let userPassword = data.get("password");

    let loggedInUser = null;

    try {
      let response = await axios.post("http://localhost:8000/api/users/login", {
        email: userEmail,
        password: userPassword,
      });
      loggedInUser = response.data.data;
      console.log(loggedInUser);
    } catch (error) {
      console.log(error.message);
      setErrorMsg("Please try again");
    }

    if (loggedInUser) {
      handleLoginSuccess(loggedInUser);
    } else {
      handleLoginFailure();
    }
  };


  return (
    <Box sx={{ flexGrow: 1, marginTop: "-4em" }}>
      <Box className="banner-content" id="second-banner-top" sx={{ width: "100%", backgroundSize:"cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bannerBg})` }}>
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
          sm={5}
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

        <Grid item xs={12} sm={7} md={5}>
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
              <Icon icon="solar:box-bold-duotone" height="41" className="icon-parcel" />
              <img src={Logo} alt="Logo" className="login-logo" />
            </Box>
            {loggedIn ? (
              <>
                <Icon icon="emojione-monotone:ribbon" className="login-welcome-icon" />
                <Typography
                  component="h1"
                  variant="h6"
                  className="welcome-message-login"
                  sx={{
                    fontFamily: "Qwitcher Grypen",
                    fontSize: "4vw",
                    borderTop: 2,
                    borderBottom: 2,
                    padding: "0.1em 0.5em 0em 0.5em",
                    margin: "0em 0.5em 0.5em 0.5em",
                  }}
                >
                  Welcome back {currentUser.firstName}!
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 300,
                    margin: "0em 1em 3em 1em",
                    textAlign: "center",
                  }}
                >
                  You will be redirected back to the homepage in a moment...
                </Typography>
              </>
            ) : null}

            {lockedOut ? (
              <Box sx={{ textAlign: "center", padding: "4em"}}>
                <Typography variant="body2" color="error">
                  {errorMsg}
                </Typography>
              </Box>
            ) : null}

            {!loggedIn && loginAttempts < 5 ? (
              <Box>
                <Box sx={{ textAlign: "center" }}>
                  <Typography variant="body2" sx={{ fontWeight: 300 }}>
                    Login with your details below
                  </Typography>
                  <Typography variant="body2" color="error" sx={{ pt: "1em" }}>
                    {errorMsg}
                  </Typography>
                </Box>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{
                    mt: 1,
                    marginBottom: "1em",
                    fieldset: {
                      borderColor: "#D2B356",
                      "&:hover": { backgroundColor: "#fff", color: "#D2B356" },
                    },
                  }}
                >
                  <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
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

                  <Grid item xs={12} sx={{ textAlign: "left" }}>
                    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label={<Typography sx={{ fontSize: "0.7em", textAlign: "left" }}>Remember me</Typography>} />
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                      mt: 3,
                      mb: 2,
                      backgroundColor: "#D2B356",
                      margin: "1em",
                      marginLeft: 0,
                      "   &:hover": {
                        backgroundColor: "#fff",
                        color: "#D2B356",
                        border: "none",
                      },
                    }}
                  >
                    LOG IN
                  </Button>
                </Box>
              </Box>
            ) : (
              loggedIn &&
              loginAttempts < 5 && (
                <Button
                  onClick={() => {
                    handleUpdateUser({});
                    setLoggedIn(false);
                  }}
                  variant="outlined"
                  sx={{
                    fontWeight: "bold",
                    border: 2,
                    padding: "0.2em 1em",
                    fontSize: "1em",
                    marginTop: "2em",
                    marginBottom: "4em",
                    "&:hover": {
                      color: "#d2b356",
                      border: "2px #d2b356 solid",
                    },
                  }}
                  className="logout-button"
                >
                  LOG OUT
                </Button>
              )
            )}
            {!loggedIn ? (
              <Box display="flex" justifyContent="center" sx={{ marginBottom: "4.7em" }}>
                <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                  <Link href="/forgot" variant="body2">
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                  <Link href="/signup" variant="body2">
                    New to ParcelMe? Join HERE!
                  </Link>
                </Grid>
              </Box>
            ) : null}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
