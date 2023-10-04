import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import formatDate from "./FormatDate";
import { Box, CircularProgress } from "@mui/material";
import SizeInfoList from "./sizeInfoList";

export default function SeeMoreTripDialog({ open, close, trip }) {
  if (!trip) {
    return (
      <Dialog fullWidth open={open}>
        <DialogContent>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
            <CircularProgress color="primary" />
          </Box>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
          POSTED TRIP
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
          Trip details:
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ padding: "0em 0.5em 0.5em 0.5em" }}>
          <Typography variant="body2">
            From:{trip.suburbFrom ? trip.suburbFrom : null} {trip.cityFrom}, {trip.stateFrom}
          </Typography>
          <Typography variant="body2">
            To: {trip.suburbTo ? trip.suburbTo : null} {trip.cityTo}, {trip.stateTo}
          </Typography>
          <Typography variant="body2" sx={{ pt: "0.2em" }}>
            Departure Date: {formatDate(trip.departureDate)}
          </Typography>
          <Typography variant="body2" sx={{ pb: "0.2em" }}>
            Arrival Date: {formatDate(trip.arrivalDate)}
          </Typography>
          <Typography variant="body2" sx={{ py: "0.2em" }}>
            Starting price from: ${trip.startingPrice}
          </Typography>
          <Box sx={{ display: "flex", mt: "0.3em" }}>
            <Typography variant="body2" sx={{ mr: "0.5em" }}>
              Available Space : {trip.availableSpace}
            </Typography>
            <SizeInfoList />
          </Box>
          <Typography variant="body2">Comments: </Typography>
          <Typography variant="body2">{trip.comments}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="filled" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
