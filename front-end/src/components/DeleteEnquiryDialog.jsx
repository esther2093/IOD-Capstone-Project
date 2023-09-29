import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Axios from "axios";

export default function DeleteEnquiryDialog({ open, close, enquiry }) {
  const [submitResult, setSubmitResult] = React.useState("");
  const [error, setError] = React.useState("");

  const handleConfirmDelete = () => {
    setError("");

    Axios.delete(`http://localhost:8000/api/enquiries/${enquiry.id}`)
      .then((response) => {
        let result = response.data.result;

        if (response.status === 200) {
          setSubmitResult(result);
          setError("");
          console.log(`Enquiry with ID ${enquiry.id} deleted successfully.`);
          close(); // Close the dialog
        } else {
          console.error(`Failed to delete enquiry with ID ${enquiry.id}.`);
        }
      })
      .catch((error) => {
        console.error("An error occurred while deleting the enquiry:", error);
      });
  };

  return (
    <Dialog open={open} close={close}>
      <DialogTitle sx={{borderBottom: "2px #D2B356 solid"}} >DELETE ENQUIRY</DialogTitle>
      <DialogContent>
        <div sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error">
            {error}
          </Typography>
          <Typography variant="body2" color="green">
            {submitResult}
          </Typography>
        </div>
        <Typography variant="body2">
          Are you sure you want to delete this enquiry?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="filled" onClick={handleConfirmDelete} color="primary">
          Yes
        </Button>
        <Button onClick={close}>No</Button>
      </DialogActions>
    </Dialog>
  );
}
