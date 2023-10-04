import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import useEnquiryData from "../hooks/useEnquiryData";

export default function DeleteTripDialog({ open, close, trip, setUpdateList }) {
  const { enquiries } = useEnquiryData();
  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  //clearing results and errors when dialog is closed 
  useEffect(() => {
    if (!open) {
      setSubmitResult("");
      setError("");
    }
  }, [open]);

  //deleting a trip and any associated enquiries that use it as a foreign key 
  const handleDelete = async () => {
    try {
      //finding the enquiries that use the specific trip.id 
      const filteredEnquiries = enquiries.filter((enquiry) => enquiry.tripId === trip.id);
      //extracting enquiry.id from filtered enquiries 
      const enquiryIds = filteredEnquiries.map((enquiry) => enquiry.id);

      //iterating and deleting the enquiries with the filtered ids 
      for (const enquiryId of enquiryIds) {
        await axios.delete(`/api/enquiries/${enquiryId}`);
      }

      //deleting trip from database
      const response = await axios.delete(`/api/trips/${trip.id}`);
      setError("");
      setSubmitResult("Your trip has been sucessfully deleted");
      //updating list to re-render parent  
      setUpdateList(trip);
      //close dialog 
      close();
    } catch (error) {
      setError("An error occurred while trying to delete your trip");
    }
  };
  
  return (
    <Dialog open={open} close={close}>
      <DialogTitle>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
          DELETE TRIP
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
          Confirmation
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Typography variant="body2" color="green">
            {submitResult}
          </Typography>
        </div>
        <Typography variant="body2">Are you sure you want to delete this trip?</Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="filled" onClick={handleDelete} color="primary">
          Yes
        </Button>
        <Button onClick={close}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
