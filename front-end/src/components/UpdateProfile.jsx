import React, { useState } from "react";
import axios from "axios";
import { Container, Box, Button, Grid, TextField } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormatDateBackend from "./FormatDateBackend";
import FormatPNumber from "./formatPNumber";
import FormatDate from "./FormatDate";

export default function UpdateProfileDialog() {
  const { currentUser, handleUpdateUser } = useUserContext();
  const [openDialog, setOpenDialog] = useState(false);

  const [updateUser, setUpdateUser] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    dateOfBirth: (currentUser.dateOfBirth),
    phoneNumber: currentUser.phoneNumber,
  });

  console.log("updateUser:", updateUser)

  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setUpdateUser(updateUser);
    setSubmitResult("");
    setError("")
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setUpdateUser((updateUser) => ({
      ...updateUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData(e.currentTarget);
    data.append("dateOfBirth", currentUser.dateOfBirth)

    axios
      .put(`http://localhost:8000/api/users/${currentUser.id}`, Object.fromEntries(data.entries()))
      .then((response) => {
        let result = response.data.result;
        let userUpdate = response.data.data;
        
        if (userUpdate) {
          setSubmitResult("Your profile has been successfully updated");
          setError("");
          handleCloseDialog();
        }
      })
      .catch((error) => {
        console.error(error.response.data.result);
        setError(error.response.data.result)
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
              mb: "0.5em",
            }}
          >
            {error}
          </Typography>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{pr: "1em"}}>
            <TextField required sx={{ m: "0.5em" }} fullWidth id="firstName" label="First Name" name="firstName" value={updateUser.firstName} onChange={handleDetailChange} />
            <TextField required sx={{ m: "0.5em" }} fullWidth id="lastName" label="Last Name" name="lastName" value={updateUser.lastName} onChange={handleDetailChange} />
            <TextField required sx={{ m: "0.5em" }} fullWidth id="email" label="Email Address" name="email" value={updateUser.email} onChange={handleDetailChange} />
            <TextField disabled sx={{ m: "0.5em" }} fullWidth id="dateOfBirth" label="DOB" name="dateOfBirth" value={FormatDate(updateUser.dateOfBirth)} onChange={handleDetailChange} />
            <TextField required sx={{ m: "0.5em" }} fullWidth id="phoneNumber" label="Phone Number" name="phoneNumber" value={"0" + updateUser.phoneNumber} onChange={handleDetailChange} />

            <Box
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button type="submit" variant="filled" sx={{ mt: 2, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Box>
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
