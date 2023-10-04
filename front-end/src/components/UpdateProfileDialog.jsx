import React, { useState } from "react";
import axios from "axios";
import { Box, Button, TextField } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormatDateBackend from "./FormatDateBackend"

export default function UpdateProfileDialog() {
  const { currentUser, handleUpdateUser } = useUserContext();
  const [openDialog, setOpenDialog] = useState(false);

  const [updateUser, setUpdateUser] = useState({
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
    dateOfBirth: FormatDateBackend(currentUser.dateOfBirth),
    phoneNumber: '0' + currentUser.phoneNumber,
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = new FormData(e.currentTarget);

      const response = await axios.put(`/api/users/${currentUser.id}`, Object.fromEntries(data.entries()));
      const userUpdate = response.data.data;
  
      if (userUpdate) {
        setError("");
        setSubmitResult("Your profile has been successfully updated");
        handleUpdateUser({ ...currentUser, ...response.data.data });
        handleCloseDialog();
      }
    } catch (error) {
      console.error(error.response.data.result);
      setError(error.response.data.result);
    }
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
            <TextField sx={{ m: "0.5em" }} fullWidth id="dateOfBirth" label="DOB" name="dateOfBirth" value={updateUser.dateOfBirth} onChange={handleDetailChange} />
            <TextField required sx={{ m: "0.5em" }} fullWidth id="phoneNumber" label="Phone Number" name="phoneNumber" value={updateUser.phoneNumber} onChange={handleDetailChange} />

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
