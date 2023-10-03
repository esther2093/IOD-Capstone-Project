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

  useEffect(() => {
    if (!open) {
      setSubmitResult("");
      setError("");
    }
  }, [open]);

  const handleDelete = async () => {
    try {
      const filteredEnquiries = enquiries.filter((enquiry) => enquiry.tripId === trip.id);
      const enquiryIds = filteredEnquiries.map((enquiry) => enquiry.id);

      for (const enquiryId of enquiryIds) {
        await axios.delete(`http://localhost:8000/api/enquiries/${enquiryId}`);
      }
      // Now delete the trip
      const response = await axios.delete(`http://localhost:8000/api/trips/${trip.id}`);
      
      setError("");
      setSubmitResult(response.data.result);
      setUpdateList(trip);
      close();
    } catch (error) {
      if (error.response) {
        // Axios error with response, handle it
        console.error("An error occurred while deleting the trip:", error.response.data.result);
        setError("An error occurred while deleting your trip");
      } else if (error.message) {
        // Other error with a message, handle it
        console.error("An error occurred:", error.message);
        setError("An error occurred while processing your request");
      } else {
        // Unexpected error, handle it
        console.error("An unexpected error occurred:", error);
        setError("An unexpected error occurred");
      }
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
