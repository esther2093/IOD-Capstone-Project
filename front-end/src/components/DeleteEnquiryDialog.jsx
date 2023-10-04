import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function DeleteEnquiryDialog({ open, close, enquiry, setUpdateList }) {
  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  //clearing fields when dialog is closed 
  useEffect(() => {
    if (!open) {
      setSubmitResult("");
    }
  }, [open]);

  //handles the deletion of an equiry 
  const handleDelete = async () => {
    try {
      //deleting from database
      const response = await axios.delete(`/api/enquiries/${enquiry.id}`);
      setError("");
      setSubmitResult("Your enquiry has been deleted successfully");
      //updating enquries list to re-render parent  
      setUpdateList(enquiry);
      //close the dialog 
      close();
    } catch (error) {
      setError("An error occurred while deleting your enquiry");
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
      </DialogTitle>{" "}
      <DialogContent>
        <div sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Typography variant="body2" color="green">
            {submitResult}
          </Typography>
        </div>
        <Typography variant="body2">Are you sure you want to delete this enquiry?</Typography>
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
