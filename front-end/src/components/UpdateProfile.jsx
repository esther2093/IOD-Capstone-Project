import React from "react";
import axios from "axios";
import { Container, Box, Button, Grid } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import formatDate from "./FormatDate"

export default function UpdateProfileDialog() {
  const { currentUser, handleUpdateUser } = useUserContext();
  const [open, setOpen] = React.useState(false);


  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/api/users/${currentUser.id}`, updatedUser);
      setStatus(response.data.result);
      handleUpdateUser(response.data.data);
    } catch (err) {
      setStatus(err.message);
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

      <Dialog fullWidth open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
            UDPATE YOUR PROFILE
          </Typography>
          <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
              Current details:
            </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid container spacing={0} >
            <Grid item xs={6} sm={6} sx={{textAlign: "left"}}>
            <Typography variant="body2"> Name: {currentUser.firstName} {currentUser.lastName}</Typography>
              <Typography variant="body2"> Email: {currentUser.email}</Typography>
              <Typography variant="body2"> Password: ****** </Typography>
              <Typography variant="body2"> Date of Birth: {formatDate(currentUser.dateOfBirth)}</Typography>
              <Typography variant="body2"> Phone Number: +61 {currentUser.phoneNumber}</Typography>
            </Grid>
            <Grid item xs={6} sm={6} sx={{textAlign: "right"}}>
              <Typography variant="body2"> Change Name </Typography>
              <Typography variant="body2"> Change Email</Typography>
              <Typography variant="body2"> Change Password</Typography>
              <Typography variant="body2"> Change D.O.B</Typography>
              <Typography variant="body2"> Change Phone Number</Typography>
            </Grid>
          </Grid>

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
