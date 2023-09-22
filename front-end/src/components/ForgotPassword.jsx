import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import axios from "axios";
import Banner from "./Banner";
import { Typography } from "@mui/material";

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
    <div>
      <div className="banner-content" id="banner-top">
        <div className="col-45">
          <div className="banner-section-heading">
            <p className="breakline">—</p>
            <h1 id="homepage-main-header">FORGOT YOUR PASSWORD?</h1>
            <p className="breakline">—</p>
          </div>
        </div>
      </div>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography component="h2">
              Enter your email address below:
            </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            required
            fullWidth
            autoFocus
            margin="normal"
            id="email"
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Send Password Reminder
          </Button>

          <p>{resultMsg}</p>
        </Box>
      </Container>
    </div>
  );
}
