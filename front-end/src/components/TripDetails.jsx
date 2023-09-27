import React, { useEffect, useState } from "react";
import useTripData from "../hooks/useTripData";
import { Typography, Button, Card, CardContent, Box, Grid } from "@mui/material";
import useUserData from "../hooks/useUserData";
import { Link, useParams } from "react-router-dom";
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

function TripDetails() {
  const { id } = useParams();
  const { idTrip } = useTripData(id);
  const { users } = useUserData();

  console.log(idTrip);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (!idTrip) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <Button variant="outlined" onClick={handleClickOpen}>
        More Details
      </Button>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <Box>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                Trip Details:
              </DialogTitle>
              <Typography variant="h1" id="banner-main-subtitle" sx={{ p: "1em" }}>
                Trip Details:
              </Typography>
            </Grid>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </Grid>
        </Box>

        <DialogContent dividers>
          <Card>
            <CardContent>
              <Typography variant="h6">
                From: {idTrip.suburbFrom}, {idTrip.cityFrom}, {idTrip.stateFrom}
              </Typography>
              <Typography variant="h6">
                To: {idTrip.suburbTo}, {idTrip.cityTo}, {idTrip.stateTo}
              </Typography>
              <Typography variant="body2">
                Date: {formatDate(idTrip.departureDate)} - {formatDate(idTrip.arrivalDate)}
              </Typography>
              <Typography variant="body2">Space: {idTrip.availableSpace}</Typography>
              <Typography variant="body2">Comments: {idTrip.comments}</Typography>

              <Box display="flex" justifyContent="center">
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
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
                </Link>
              </Box>
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
}

export default TripDetails;
