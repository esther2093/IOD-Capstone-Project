import React, { useEffect, useState } from "react";
import useTripData from "../hooks/useTripData";
import { Typography, Button, Box, Grid, Avatar, CircularProgress } from "@mui/material";
import useUserData from "../hooks/useUserData";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import EnquiryForm from "./EnquiryForm";
import formatDate from "./FormatDate";
import SizeInfoList from "./sizeInfoList";

export default function TripDetails({ tripId }) {
  const { trip } = useTripData(tripId);
  const { users } = useUserData();

  const [userFirstNames, setUserFirstNames] = useState([]);
  const [userProfilePicture, setUserProfilePictures] = useState([]);
  const [open, setOpen] = useState(false);
  const [showEnquireForm, setShowEnquireForm] = useState(false);

  //extract first names and profile pictures and store it into arrays
  useEffect(() => {
    const firstNamesArray = users.map((user) => user.firstName);
    setUserFirstNames(firstNamesArray);
    const profilePictureArray = users.map((user) => user.profilePicture);
    setUserProfilePictures(profilePictureArray);
  }, [users]);

  //handle to open and close dialog
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setShowEnquireForm(false);
  };

  //handle to show enquiry form
  const handleShowEnquireForm = () => {
    setShowEnquireForm((prevShowEnquireForm) => !prevShowEnquireForm);
  };

  //loading circle if trip data not loaded
  if (!trip) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "right" }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <Box sx={{ display: "flex", justifyContent: "right" }}>
        <Button onClick={handleOpen} sx={{ fontSize: "0.8em" }}>
          More Details
        </Button>
      </Box>

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Box>
          <DialogTitle sx={{ m: 0 }} id="customized-dialog-title">
            <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
              MORE DETAILS
            </Typography>
            <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
              Chosen trip details:
            </Typography>
          </DialogTitle>
        </Box>

        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
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
                  <img src={userProfilePicture[trip.userId - 1]} width="100%" alt={"NO PROFILE PICTURE"} />
                </Avatar>
                <Typography variant="body2" sx={{ textAlign: "center" }}>
                  Parceler: {userFirstNames[trip.userId - 1]}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={8}>
                <Typography variant="h6">
                  {trip.suburbFrom} {trip.cityFrom}, {trip.stateFrom} - {trip.suburbTo} {trip.cityTo}, {trip.stateTo}
                </Typography>
                <Typography variant="body2">
                  Date: {formatDate(trip.departureDate)} - {formatDate(trip.arrivalDate)}
                </Typography>
                <Typography variant="body2" sx={{ py: "0.2em" }}>
                  Starting price from: ${trip.startingPrice}
                </Typography>
                <Box sx={{ display: "flex", mt: "0.3em" }}>
                  <SizeInfoList />
                  <Typography variant="body2" sx={{ ml: "0.5em", mt: "0.2em" }}>
                    Available Space : {trip.availableSpace}
                  </Typography>
                </Box>
                <Typography variant="body2">Comments: </Typography>
                <Typography variant="body2">{trip.comments}</Typography>
              </Grid>

              <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
                <Button
                  variant="filled"
                  onClick={handleShowEnquireForm}
                  sx={{
                    mt: "1.3em ",
                    mb: "0.5em",
                  }}
                >
                  REQUEST
                </Button>
              </Grid>

              <Grid item xs={12}>
                {showEnquireForm && <EnquiryForm tripId={trip.id} />}
              </Grid>
            </Grid>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            DONE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
