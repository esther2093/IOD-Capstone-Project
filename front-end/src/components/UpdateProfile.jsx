import React, { useState } from "react";
import axios from "axios";
import { Container, Box, Button, Grid, TextField } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import formatDate, { formatDateYYYY } from "./FormatDate";
import FormatDateBackend from "./FormatDateBackend";
import FormatPNumber from "./formatPNumber";

export default function UpdateProfileDialog() {
  
  const { currentUser, handleUpdateUser } = useUserContext();
  const [openDialog, setOpenDialog] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    dateOfBirth: currentUser.dateOfBirth,
    phoneNumber: currentUser.phoneNumber,
  });
  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((updatedUser) => ({
      ...updatedUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    e.preventDefault();
    setError("");
    setSubmitResult("");
    let updatedUser = new FormData(e.currentTarget);
    updatedUser.append("firstName", updatedUser.firstName);
updatedUser.append("lastName", updatedUser.lastName);
updatedUser.append("email", updatedUser.email);
updatedUser.append("phoneNumber", updatedUser.phoneNumber);
updatedUser.append("dateOfBirth", updatedUser.dateOfBirth);

    axios
      .put(`http://localhost:8000/api/users/${currentUser.id}`, Object.fromEntries(updatedUser.entries()))
      .then((response) => {
        let result = response.data.result;
        let updateResponse = response.data.data;

        if (updateResponse) {
          handleUpdateUser(update);
          setError("");
          handleCloseDialog();
          setSubmitResult(result);
        }
      })
      .catch ((error) => {
        setError(error.response.data.result);
      });
    };
  
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: "1em",
      }}
    >
      <Button
        variant="filled"
        onClick={handleOpenDialog}
        sx={{
          border: 1,
          padding: "0.3em 1em",
          fontSize: "0.8em",
        }}
      >
        Update Profile
      </Button>

      <Dialog fullWidth open={openDialog} onClose={handleCloseDialog} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
            UDPATE YOUR PROFILE
          </Typography>
          <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
            Current details:
          </Typography>
        </DialogTitle>

        <DialogContent>
        <Typography
              variant="body2"
              sx={{
                fontWeight: 300,
                textAlign: "center",
                color: "green",
              }}
            >
              {submitResult}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 300,
                textAlign: "center",
                color: "red",
                mb: "0.5em"
              }}
            >
              {error}
            </Typography>

          <Box onSubmit={handleSubmit}>
            <TextField required sx={{ m: "0.5em" }} fullWidth id="firstName" label="First Name" name="firstName" value={updatedUser.firstName} onChange={handleDetailChange} />
            <TextField required sx={{ m: "0.5em" }} fullWidth id="lastName" label="Last Name" name="lastName" value={updatedUser.lastName} onChange={handleDetailChange} />
            <TextField required sx={{ m: "0.5em" }} fullWidth id="email" label="Email Address" name="email" value={updatedUser.email} onChange={handleDetailChange} />
            <TextField required sx={{ m: "0.5em" }} fullWidth id="dateOfBirth" label="DOB" name="dateOfBirth" value={FormatDateBackend(updatedUser.dateOfBirth)} onChange={handleDetailChange} />
            <TextField required sx={{ m: "0.5em" }} fullWidth id="phoneNumber" label="Phone Number" name="phoneNumber" value={"0" + updatedUser.phoneNumber} onChange={handleDetailChange} />
          </Box>

          <Container component="main" sx={{ pl: 0 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button type="submit" variant="filled" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            DONE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
