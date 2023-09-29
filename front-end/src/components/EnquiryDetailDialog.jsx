import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import axios from "axios";

export default function EnquiryDetailsDialog({ open, onClose, selectedEnquiry }) {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const handleAcceptClick = () => {
    axios
      .put(`http://localhost:8000/api/enquiries/${selectedEnquiry.id}`, {
        accepted: true,
      })
      .then((response) => {
        console.log("Enquiry updated to true:", response.data);
        setIsAccepting(true);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating enquiry:", error);
      });
  };

  const handleDeclineClick = () => {
    axios
      .put(`http://localhost:8000/api/enquiries/${selectedEnquiry.id}`, {
        accepted: false,
      })
      .then((response) => {
        console.log("Enquiry updated to false:", response.data);
        setIsDeclining(true);
        onClose();
      })
      .catch((error) => {
        console.error("Error updating enquiry:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ borderBottom: "2px #D2B356 solid" }}>EDIT TRIP</DialogTitle>
      <DialogContent>
        <Typography variant="h6">{selectedEnquiry?.trip}</Typography>
        <Typography variant="body1">Dates: {selectedEnquiry?.dates}</Typography>
        <Typography variant="body1">Enquiry: {selectedEnquiry?.enquiry}</Typography>
        <Typography variant="body1">Enquiry Date: {selectedEnquiry?.enquiryDate}</Typography>
        <Typography variant="body1">
          Status:{" "}
          {selectedEnquiry?.enquiryStatus === null ? (
            <Icon icon="eos-icons:three-dots-loading" width="20" />
          ) : selectedEnquiry?.enquiryStatus ? (
            <Icon icon="subway:tick" color="green" />
          ) : (
            <Icon icon="foundation:x" color="red" />
          )}
        </Typography>

        <Button onClick={handleAcceptClick} disabled={isAccepting}>
          Accept
        </Button>
        <Button onClick={handleDeclineClick} disabled={isDeclining}>
          Decline
        </Button>
      </DialogContent>
      <DialogActions>
        <Button variant="filled" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
