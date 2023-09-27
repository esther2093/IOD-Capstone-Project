import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import { Grid, Typography } from "@mui/material";
import bannerBg from "../assets/bannerImage.jpg";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [resultMsg, setResultMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8000/api/users/sendpw", { email: email })
      .then((response) => setResultMsg(response.data.result))
      .catch((err) => setResultMsg(err.response.data.result));
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
              FORGOT YOUR PASSWORD?
            </Typography>
            <Typography variant="subtitle1" id="banner-main-subtitle">
              Don't sweat it - we got you.
            </Typography>
            <Typography variant="h4" className="breakline">
              —
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container xs={6} sx={{p: "2em"}}>
        <Grid item xs={12}>
          <Typography component="h2">Enter your email address below:</Typography>
        </Grid>

        <Grid item xs={12}>
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
            <Button type="submit" fullWidth variant="contained" sx={{
                  backgroundColor: "#D2B356",
                  margin: "1em",
                  width: "50%",
                  "&:hover": { backgroundColor: "#fff", color: "#D2B356" },
                }}>
              Send Password Reminder
            </Button>

            <p>{resultMsg}</p>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
