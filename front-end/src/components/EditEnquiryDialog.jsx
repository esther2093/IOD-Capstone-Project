import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { Box, TextField } from "@mui/material";


export default function EditEnquiryDialog({ open, close, enquiry, setUpdateList }) {
  const [editedEnquiry, setEditedEnquiry] = useState({
    id: "",
        userId: "",
        tripId: "",
        comments: "",
        accepted: "",
        createdAt: "",
        updatedAt: ""
  });

  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    if (enquiry) {
      const originalEnquiry = {
        id: enquiry.id,
        userId: enquiry.userId,
        tripId: enquiry.tripId,
        comments: capitalizeFirstLetter(enquiry.comments),
        accepted: enquiry.accepted,
        createdAt: enquiry.createdAt,
        updatedAt: enquiry.updatedAt
      };
    setEditedEnquiry(originalEnquiry);
      }
  }, [enquiry]);

  useEffect(() => {
    if (!open) {
      setSubmitResult("");
    }
  }, [open]);

  const handleEditForm = (e) => {
    const { name, value } = e.target;
    setEditedEnquiry((originalEnquiry) => ({
      ...originalEnquiry,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    editedEnquiry.accepted = null;

    try {
      const response = await axios.put(`http://localhost:8000/api/enquiries/${enquiry.id}`, editedEnquiry)
      setError("");
      setSubmitResult(response.data.result);
      setUpdateList(editedEnquiry);
      close();
    } catch (error) {
        console.error("An error occurred while updating the enquiry:", error.response.data.result);
        setError("An error occurred while updating the enquiry");
      };
  };

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle>
      <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
          EDIT DETAILS
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
          Edit your enquiry
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body2" color="error">{error}</Typography>
          <Typography variant="body2" color="green">{submitResult}</Typography>
        </Box>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField sx={{ m: "0.5em" }} multiline maxRows={10} fullWidth name="comments" label="Comments" value={editedEnquiry.comments} onChange={handleEditForm} />
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
