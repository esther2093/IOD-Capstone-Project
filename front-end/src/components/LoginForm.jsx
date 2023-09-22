import * as React from "react";
import Avatar from "@mui/material/Avatar";
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
import { useState } from "react";
import { useUserContext } from "../context/UserContext";
import Container from "@mui/material/Container";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo.png";

export default function LoginForm() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userFirstName, setuserFirstName] = useState("");

  const [submitResult, setSubmitResult] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);

  const { currentUser, handleUpdateUser } = useUserContext();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userPassword.length < 5) {
      setSubmitResult("Password must be at least 5 characters long");
      setLoginAttempts(loginAttempts + 1);
    } else if (userPassword === userEmail) {
      setSubmitResult("Password must not match email address");
      setLoginAttempts(loginAttempts + 1);
    } else if (!emailRegex.test(userEmail)) {
      setSubmitResult("Email failed regular expression match");
      setLoginAttempts(loginAttempts + 1);
    } else {
      setSubmitResult("Successful login.");
      handleUpdateUser({ email: userEmail, name: userFirstName });
      setLoginAttempts(0);
    }
  };

  if (currentUser.email) {
    window.location.href = "/";
  } else if (loginAttempts >= 5) return <p>Login attempts exceeded</p>;

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
              <img src={Logo} alt="Logo" className="login-logo"/>
            </div>
            <Typography component="h4" className="login-subtitle">
              Please login to your account and start your shipping!
            </Typography>
            <br/>
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
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />

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
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
