import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Axios from "axios";
import { Box, TextField } from "@mui/material";
import formatDateBackend from "./FormatDateBackend";

export default function EditTripDialog({ open, close, trip, setUpdateList }) {
  const [editedTrip, setEditedTrip] = useState({
    suburbFrom: "",
    cityFrom: "",
    stateFrom: "",
    suburbTo: "",
    cityTo: "",
    stateTo: "",
    availableSpace: "",
    departureDate: "",
    arrivalDate: "",
  });

  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const tripEdit = trip
      ? {
          suburbFrom: capitalizeFirstLetter(trip.suburbFrom),
          cityFrom: capitalizeFirstLetter(trip.cityFrom),
          stateFrom: capitalizeFirstLetter(trip.stateFrom),
          suburbTo: capitalizeFirstLetter(trip.suburbTo),
          cityTo: capitalizeFirstLetter(trip.cityTo),
          stateTo: capitalizeFirstLetter(trip.stateTo),
          availableSpace: capitalizeFirstLetter(trip.availableSpace),
          departureDate: formatDateBackend(trip.departureDate),
          arrivalDate: formatDateBackend(trip.arrivalDate),
          comments: capitalizeFirstLetter(trip.comments),
        }
      : {
          suburbFrom: "",
          cityFrom: "",
          stateFrom: "",
          suburbTo: "",
          cityTo: "",
          stateTo: "",
          availableSpace: "",
          departureDate: "",
          arrivalDate: "",
          comments: "",
        };

    setEditedTrip(tripEdit);
  }, [trip]);

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditedTrip((prevTrip) => ({
      ...prevTrip,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = () => {
    setError("");
    setSubmitResult("");

    Axios.put(`http://localhost:8000/api/trips/${trip.id}`, editedTrip)
      .then((response) => {
        let result = response.data.result;
        let tripResponse = response.data.data;

        if (tripResponse) {
          setError("");
          setSubmitResult(result);
          close();
          console.log(tripResponse);
          setUpdateList(true);
        }
      })
      .catch((error) => {
        console.error("An error occurred while updating the trip:", error.response.data.result);
        setError("An error occurred while updating the trip");
      });
  };

  return (
    <Dialog fullWidth open={open} close={close}>
      <DialogTitle sx={{ borderBottom: "2px #D2B356 solid" }}>EDIT TRIP</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error">{error}</Typography>
          <Typography variant="body2" color="green">{submitResult}</Typography>
        </Box>
        <Box onSubmit={handleEditFormSubmit}>
          <TextField sx={{ m: "0.5em", textSize: "0.5em" }} fullWidth name="suburbFrom" label="From Suburb" value={editedTrip.suburbFrom} onChange={handleEditFormChange} />
          <TextField sx={{ m: "0.5em" }} required fullWidth name="cityFrom" label="From City" value={editedTrip.cityFrom} onChange={handleEditFormChange} />
          <TextField sx={{ m: "0.5em" }} required fullWidth name="stateFrom" label="From State" value={editedTrip.stateFrom} onChange={handleEditFormChange} />
          <TextField sx={{ m: "0.5em" }} fullWidth name="suburbTo" label="To Suburb" value={editedTrip.suburbTo} onChange={handleEditFormChange} />
          <TextField sx={{ m: "0.5em" }} required fullWidth name="cityTo" label="To City" value={editedTrip.cityTo} onChange={handleEditFormChange} />
          <TextField sx={{ m: "0.5em" }} required fullWidth name="stateTo" label="To State" value={editedTrip.stateTo} onChange={handleEditFormChange} />
          <TextField sx={{ m: "0.5em" }} required fullWidth name="departureDate" label="Departure Date" value={editedTrip.departureDate} onChange={handleEditFormChange} />
          <TextField sx={{ m: "0.5em" }} required fullWidth name="arrivalDate" label="Arrival Date" value={editedTrip.arrivalDate} onChange={handleEditFormChange} />
          <TextField sx={{ m: "0.5em" }} required fullWidth name="availableSpace" label="Available Space" value={editedTrip.availableSpace} onChange={handleEditFormChange} />
          <TextField sx={{ m: "0.5em" }} multiline maxRows={10} fullWidth name="comments" label="Comments" value={editedTrip.comments} onChange={handleEditFormChange} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditFormSubmit}>Save Changes</Button>
        <Button variant="filled" onClick={close}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
