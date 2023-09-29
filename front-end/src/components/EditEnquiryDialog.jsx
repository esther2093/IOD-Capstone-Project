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

export default function EditEnquiryDialog({ open, close, enquiry, setUpdateList }) {
  const [editedEnquiry, setEditedEnquiry] = useState({
    comments: "",
  });

  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    const newEnquiry = enquiry? {comments: capitalizeFirstLetter(enquiry.comments)} : {comments: ""};
    setEditedEnquiry(newEnquiry);
  }, [enquiry]);

  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditedEnquiry((prevEnquiry) => ({
      ...prevEnquiry,
      [name]: value,
    }));
  };

  const handleEditFormSubmit = () => {
    setError("");
    setSubmitResult("");

    Axios.put(`http://localhost:8000/api/enquiry/${enquiry.id}`, editedEnquiry)
      .then((response) => {
        let result = response.data.result;
        let enquiryResponse = response.data.data;

        if (enquiryResponse) {
          setError("");
          setSubmitResult(result);
          close();
          console.log(enquiryResponse);
          setUpdateList(true);
        }
      })
      .catch((error) => {
        console.error("An error occurred while updating the enquiry:", error.response.data.result);
        setError("An error occurred while updating the enquiry");
      });
  };

  return (
    <Dialog fullWidth open={open} close={close}>
      <DialogTitle sx={{ borderBottom: "2px #D2B356 solid" }}>EDIT ENQUIRY</DialogTitle>
      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error">{error}</Typography>
          <Typography variant="body2" color="green">{submitResult}</Typography>
        </Box>
        <Box onSubmit={handleEditFormSubmit}>
          <TextField sx={{ m: "0.5em" }} multiline maxRows={10} fullWidth name="comments" label="Comments" value={editedEnquiry.comments} onChange={handleEditFormChange} />
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
