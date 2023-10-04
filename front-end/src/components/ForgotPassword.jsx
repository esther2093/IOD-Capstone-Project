import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import bannerBg from "../assets/bannerImage.jpg";
import forgotPasswordPicture from "../assets/forgotPasswordPicture.jpg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // post request to database to request a password reset
      const response = await axios.post("/api/users/sendpw", { email: email });

      setSubmitResult(response.data.result);
    } catch (error) {
      setError(error.response.data.result);
    }
  };
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <Box className="banner-content" id="second-banner-top" sx={{ width: "100%", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundImage: `url(${bannerBg})` }}>
        <Box className="banner-section-box">
          <Box className="banner-section-heading">
            <Typography variant="h4" className="breakline">
              —
            </Typography>
            <Typography gutterBottom variant="h4" id="banner-main-header" sx={{ letterSpacing: -5 }}>
              FORGOT PASSWORD
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Don't sweat it, we'll parcel it to you
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container xs={12} sx={{ p: "4em 3em 4em 3em", alignItems: "center" }}>
        <Grid item xs={6} sx={{ display: "block", alignItems: "center" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="error">
              {error}
            </Typography>
            <Typography variant="body2" color="green">
              {submitResult}
            </Typography>
          </Box>
          <Typography variant="body2">Enter your email address below:</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField required fullWidth autoFocus margin="normal" id="email" label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#D2B356",
                margin: "1em",
                width: "50%",
                "&:hover": { backgroundColor: "#fff", color: "#D2B356" },
              }}
            >
              PARCELME PASSWORD
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6} className="forgot-password-pic" sx={{ textAlign: "center" }}>
          <img src={forgotPasswordPicture} alt="Parcel" className="services-parcel-pic" />
        </Grid>
      </Grid>
    </Box>
  );
}
