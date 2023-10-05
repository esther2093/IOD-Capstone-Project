import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box, FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import FormatDateBackend, { FormatDateBackendReverse } from "./FormatDateBackend";
import SizeInfoList from "./sizeInfoList";

export default function EditTripDialog({ open, close, trip, setUpdateList }) {
  //define intial state of edited trip
  const [editedTrip, setEditedTrip] = useState({
    id: "",
    suburbFrom: "",
    cityFrom: "",
    stateFrom: "",
    suburbTo: "",
    cityTo: "",
    stateTo: "",
    startingPrice: "",
    availableSpace: "",
    departureDate: "",
    arrivalDate: "",
  });

  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  let spaceSizes = ["Small", "Medium", "Large", "Extra Large"];

  //function to capitalise the first letter of each string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  //populates editedTrip when an trip is provided
  useEffect(() => {
    if (trip) {
      const originalTrip = {
        id: trip.id,
        suburbFrom: capitalizeFirstLetter(trip.suburbFrom),
        cityFrom: capitalizeFirstLetter(trip.cityFrom),
        stateFrom: capitalizeFirstLetter(trip.stateFrom),
        suburbTo: capitalizeFirstLetter(trip.suburbTo),
        cityTo: capitalizeFirstLetter(trip.cityTo),
        stateTo: capitalizeFirstLetter(trip.stateTo),
        startingPrice: trip.startingPrice,
        availableSpace: capitalizeFirstLetter(trip.availableSpace),
        departureDate: FormatDateBackend(trip.departureDate),
        arrivalDate: FormatDateBackend(trip.arrivalDate),
        comments: capitalizeFirstLetter(trip.comments),
      };
      setEditedTrip(originalTrip);
    }
  }, [trip]);

  //resets form submit status when dialog closed
  useEffect(() => {
    if (!open) {
      setSubmitResult("");
      setError("");
    }
  }, [open]);

  //handle to track form input changes and update editedTrip
  const handleEditForm = (e) => {
    const { name, value } = e.target;
    setEditedTrip((originalTrip) => ({
      ...originalTrip,
      [name]: value,
    }));
  };

  //handles to submit the edited trip
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //update edited trip to database
      const response = await axios.put(`/api/trips/${trip.id}`, editedTrip);
      setError("");
      setSubmitResult(response.data.result);
      //updates userTripList
      setUpdateList(editedTrip);
      close();
    } catch (error) {
      setError(error.response.data.result);
    }
  };

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
          EDIT DETAILS
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
          Edit your trip
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Typography variant="body2" color="green">
            {submitResult}
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ pr: "1em" }}>
          <Box sx={{ display: "flex" }}>
            <TextField sx={{ m: "0.5em" }} fullWidth name="suburbFrom" label="From Suburb" value={editedTrip.suburbFrom} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="cityFrom" label="From City" value={editedTrip.cityFrom} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="stateFrom" label="From State" value={editedTrip.stateFrom} onChange={handleEditForm} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField sx={{ m: "0.5em" }} fullWidth name="suburbTo" label="To Suburb" value={editedTrip.suburbTo} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="cityTo" label="To City" value={editedTrip.cityTo} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="stateTo" label="To State" value={editedTrip.stateTo} onChange={handleEditForm} />
          </Box>
          <Box sx={{ display: "flex" }}>
            <TextField sx={{ m: "0.5em" }} required fullWidth name="departureDate" label="Departure Date" value={editedTrip.departureDate} onChange={handleEditForm} />
            <TextField sx={{ m: "0.5em" }} required fullWidth name="arrivalDate" label="Arrival Date" value={editedTrip.arrivalDate} onChange={handleEditForm} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FormControl required sx={{mr: "1em", width: "40%"}}>
              <InputLabel htmlFor="startingPrice" sx={{ mt: "0.5em", ml: "0.5em" }}>
                Starting price
              </InputLabel>
              <OutlinedInput
                sx={{ m: "0.5em" }}
                required
                fullWidth
                name="startingPrice"
                label="Starting Price"
                value={editedTrip.startingPrice}
                onChange={handleEditForm}
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
              />
            </FormControl>
            <FormControl sx={{ m: "0.5em", mr: "1em", width: "45%" }} required>
              <InputLabel htmlFor="availableSpace">Available Space</InputLabel>
              <Select required id="availableSpace" label="Available Space" name="availableSpace" value={editedTrip.availableSpace} onChange={handleEditForm}>
                {spaceSizes.map((spaceSize) => (
                  <MenuItem key={spaceSize} value={spaceSize}>
                    {spaceSize}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{color: "#D2B356"}}>
              {" "}
              <SizeInfoList />
            </Box>
          </Box>
          <TextField sx={{ m: "0.5em" }} multiline maxRows={10} fullWidth name="comments" label="Comments" value={editedTrip.comments} onChange={handleEditForm} />
          <Box sx={{ pt: "1em", textAlign: "center" }}>
            <Button type="submit" variant="filled">
              Save
            </Button>
          </Box>
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
