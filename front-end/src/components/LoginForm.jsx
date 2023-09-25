import React, { useState } from "react";
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

export default function LoginForm() {
  const { currentUser, handleUpdateUser } = useUserContext();

  const [loggedIn, setLoggedIn] = React.useState(currentUser.firstName);
  const [errMsg, setErrMsg] = React.useState("");
  const [loginAttempts, setLoginAttempts] = React.useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  console.log(currentUser);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

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
      

    } catch (err) {
      console.log(err.message);
      setErrMsg("Please try again");
    }

    if (!loggedInUser) {
      let newAttempts = loginAttempts + 1;

      if (newAttempts === 5) {
        setErrMsg("Maximum login attempts exceeded. Please try again later.");
      } else {
        setErrMsg(
          "Unsuccessful login " + (5 - newAttempts) + " attempts remaining"
        );
      }
      setLoginAttempts(newAttempts);
      setLoggedIn(false);
    } else {
      setErrMsg("");
      handleUpdateUser(loggedInUser);
      setLoggedIn(true);

      setTimeout(() => {
        window.location.href = "/";
      }, 4000);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: "-4em",  }}>

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
              LOGIN
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container component="main" sx={{ padding: "1em"}}>
        <CssBaseline />
        <Grid
          item
          xs={12}
          sm={5}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: { xs: "block", md: "flex" },
          }}
        />

        <Grid item xs={12} sm={7} md={5} square>
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
              <Typography
                variant="body2"
                sx={{ fontWeight: 300, textAlign: "center" }}
              >
                Login with your details below
              </Typography>
            </Box>
            {loggedIn ? (
              <>
                <Icon
                  icon="emojione-monotone:ribbon"
                  className="login-welcome-icon"
                />
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
            <Typography variant="body2" color="error">
              {errMsg}
            </Typography>

            {!loggedIn && loginAttempts < 5 ? (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1, marginBottom: "1em" }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  variant="outlined"
                  sx={{
                    fieldset: {
                      borderColor: "#D2B356",
                      "&:hover": { backgroundColor: "#fff", color: "#D2B356" },
                    },
                  }}
                />
                <FormControl
                  fullWidth
                  variant="outlined"
                  sx={{
                    fieldset: {
                      borderColor: "#D2B356",
                      "&:hover": { backgroundColor: "#fff", color: "#D2B356" },
                    },
                  }}
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

                <Grid item xs={12} sx={{ textAlign: "left" }}>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label={
                      <Typography sx={{ fontSize: "0.7em", textAlign: "left" }}>
                        Remember me
                      </Typography>
                    }
                  />
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, 
                    backgroundColor: "#D2B356",
                    margin: "1em",
                    marginLeft: 0,
                    "   &:hover": {
                      backgroundColor: "#fff",
                      color: "#D2B356",
                      border: "none"
                    },
                  }}
                >
                  LOG IN
                </Button>
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
              <Box display="flex" justifyContent="center" sx={{ marginBottom: "4.7em"}}>
                <Grid item xs={12} sm={6} sx={{ textAlign: "center"}}>
                  <Link href="/forgot" variant="body2">
                    Forgot Password?
                  </Link>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "center"}}>
                  <Link href="/signup" variant="body2">
                    Don't have an account? Sign Up HERE!
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
