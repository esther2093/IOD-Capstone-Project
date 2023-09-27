import React, { useEffect, useState } from "react";
import useTripData from "../hooks/useTripData";
import { Typography, Button, Card, CardContent, Box, Grid, styled, Avatar, ButtonBase, Paper, TextField } from "@mui/material";
import useUserData from "../hooks/useUserData";
import { Link } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

export default function TripDetails({ tripId }) {
  const { trip } = useTripData(tripId);
  const { users } = useUserData();

  const [userFirstNames, setUserFirstNames] = useState([]);
  const [userProfilePicture, setUserProfilePictures] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [showEnquireForm, setShowEnquireForm] = useState(false); // Control the visibility of the form
  const [enquiry, setEnquiry] = useState({
    itemToSend: "",
    comments: "",
  });

  useEffect(() => {
    const firstNamesArray = users.map((user) => user.firstName);
    setUserFirstNames(firstNamesArray);
    //console.log("First Names:", firstNamesArray);
  }, [users]);

  useEffect(() => {
    const profilePictureArray = users.map((user) => user.profilePicture);
    setUserProfilePictures(profilePictureArray);
    //console.log("Profile Picture:", profilePictureArray);
  }, [users]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleShowEnquireForm = () => {
    setShowEnquireForm((prevShowEnquireForm) => !prevShowEnquireForm); // Toggle the visibility of the form
  };

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiry((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitEnquiry = () => {
    // Handle submission of the enquiry form, e.g., send data to the server
    // You can access the form data using enquireFormData
    // Reset the form or close the message box as needed
    // For example, setEnquireFormData({ itemToSend: "", comments: "" });
  };

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        More Details
      </Button>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <Box>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Trip Details:
              </DialogTitle>
            </Grid>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "#D2B356",
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Box>

        <DialogContent dividers>
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={4}>
              <Avatar
                  variant="square"
                  sx={{
                    width: "90%",
                    height: "90%",
                    backgroundColor: "white",
                  }}
                >
                  <img src={"http://localhost:8000/" + userProfilePicture[trip.userId - 1]} width="100%" alt={"NO PROFILE PICTURE"} />
                </Avatar>
                <Typography variant="body2">Parceler: {userFirstNames[trip.userId - 1]}</Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Typography variant="h6">
                  {trip.suburbFrom}, {trip.cityFrom}, {trip.stateFrom} - {trip.suburbTo}, {trip.cityTo}, {trip.stateTo}
                </Typography>
                <Typography variant="body2">
                  Date: {formatDate(trip.departureDate)} - {formatDate(trip.arrivalDate)}
                </Typography>
                <Typography variant="body2">Space: {trip.availableSpace}</Typography>
                <Typography variant="body2">Comments: {trip.comments}</Typography>

                <Box display="flex" justifyContent="center">
                  <Button
                    variant="contained"
                    onClick={handleShowEnquireForm}
                    sx={{
                      backgroundColor: "#D2B356",
                      margin: "1em",
                      marginLeft: 0,
                      "   &:hover": {
                        backgroundColor: "#fff",
                        color: "#D2B356",
                      },
                    }}
                  >
                    PARCELME
                  </Button>
                </Box>
                </Grid>

                
                {showEnquireForm && (
                  <Grid item sx={{ padding: "1em" }}>
                    <form onSubmit={handleSubmitEnquiry}>
                      <TextField name="itemToSend" label="Item to Send" fullWidth value={enquiry.itemToSend} onChange={handleEnquiryChange} margin="normal" variant="outlined" />
                      <TextField name="comments" label="Comments" fullWidth multiline rows={4} value={enquiry.comments} onChange={handleEnquiryChange} margin="normal" variant="outlined" />
                      <Button type="submit" variant="contained" sx={{ backgroundColor: "#D2B356", marginTop: "1em" }}>
                        Submit Enquiry
                      </Button>
                    </form>
                  </Grid>
                )}
              
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
