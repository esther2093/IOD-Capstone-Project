import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useUserContext } from "../context/UserContext";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";
import { Container } from "@mui/material";
import axios from "axios";
import FilledInput from "@mui/material/FilledInput";
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

  console.log(currentUser);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
        setErrMsg("Unsuccessful login " + (5 - newAttempts) + " attempts remaining");
      }
      setLoginAttempts(newAttempts);
      setLoggedIn(false);
    } else {
      setErrMsg("");
      handleUpdateUser(loggedInUser);
      setLoggedIn(true);
    }
  };

  return (
    <div className="login-container">
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
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
          }}
        />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="login-logo-container">
              <Icon icon="solar:box-bold-duotone" height="41" />
              <img src={Logo} alt="Logo" className="login-logo" />
            </div>
            <Typography component="h4" className="login-subtitle">
              Please login to your account and start your shipping!
            </Typography>
            <br />

            <Typography component="h1" variant="h5">
              {loggedIn ? "Hello " + currentUser.firstName : ""}
            </Typography>
            <Typography variant="body2" color="error">
              {errMsg}
            </Typography>

            {!loggedIn && loginAttempts < 5 ? (
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
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
                />
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
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>

                <Grid
                  container
                  spacing={{ xs: 2, md: 4 }}
                  columns={{ xs: 1, sm: 8, md: 12 }}
                >
                  <Grid item xs={2} sm={4} md={5}>
                    <Link href="/forgot" variant="body2">
                      Forgot Password?
                    </Link>
                  </Grid>

                  <Grid item xs={2} sm={4} md={7}>
                    <Link href="/signup" variant="body2">
                      Don't have an account? Sign Up HERE!
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            ) : (
              loggedIn && loginAttempts < 5 && (
                <Button
                  onClick={() => {
                    handleUpdateUser({});
                    setLoggedIn(false);
                  }}
                >
                  Log Out
                </Button>
              )
            )}
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
