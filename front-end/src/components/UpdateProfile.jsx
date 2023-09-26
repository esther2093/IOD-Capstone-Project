import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, Button, TextField } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateProfileDialog() {
  const { currentUser, handleUpdateUser } = useUserContext();
  const [open, setOpen] = React.useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    password: "",
    phoneNumber: "",
  }); // Initialize with empty values
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Set the initial state of updatedUser with current user's data
    setUpdatedUser({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      dateOfBirth: currentUser.dateOfBirth,
      email: currentUser.email,
      password: "", // You may want to leave this empty for security reasons
      phoneNumber: currentUser.phoneNumber,
    });
  }, [currentUser]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:8000/api/users/${currentUser.id}`,
        updatedUser
      );
      setStatus(response.data.result);
      handleUpdateUser(response.data.data);
    } catch (err) {
      setStatus(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
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
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          border: 1,
          padding: "0.3em 1em",
          fontSize: "0.8em",
          "&:hover": {
            color: "#d2b356",
            border: "1px #d2b356 solid",
          },
        }}
      >
        Update Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography
            variant="h6"
            className="section-subhead"
            sx={{ fontSize: "0.6em" }}
          >
            UPDATE YOUR PROFILE
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Container component="main" sx={{ pl: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 300,
                textAlign: "center",
                color: "green",
              }}
            >
              {status}
            </Typography>
          
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
              <TextField
                name="firstName"
                label="First Name"
                value={updatedUser.firstName}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <TextField
                name="lastName"
                label="Last Name"
                value={updatedUser.lastName}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <TextField
                name="dateOfBirth"
                label="Date of Birth"
                value={updatedUser.dateOfBirth}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <TextField
                name="email"
                label="Email"
                value={updatedUser.email}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <TextField
                name="password"
                label="Password"
                type="password"
                value={updatedUser.password}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <TextField
                name="phoneNumber"
                label="Phone Number"
                value={updatedUser.phoneNumber}
                onChange={handleInputChange}
                sx={{ mt: 2 }}
              />
              <Button type="submit" variant="filled" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            DONE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
