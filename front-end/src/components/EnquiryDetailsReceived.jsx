import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Icon } from "@iconify/react";
import axios from "axios";
import formatDate from "./FormatDate";
import { Box } from "@mui/material";
import SizeInfoList from "./sizeInfoList";

export default function EnquiryDetailsReceived({ open, close, enquiry, trip, currentUser}) {

//handle to accept or reject enquiries recieved by user 
  const handleAccept = async (status) => {
    try {
      //when status is accepted, sends a message to the otherUserId to start a chat 
      if (status) {
        await axios.post("/api/messages/create", {
          senderId: currentUser.id,
          receiverId: enquiry.userId,
          content: "Your trip enquiry has been approved for " + trip.cityFrom + " to " + trip.cityTo + " on " + formatDate(trip.departureDate) + " - " + formatDate(trip.arrivalDate),
        });
      }
      
      //update status of the enquiry to database
      const response = await axios.put(`/api/enquiries/${enquiry.id}`, {
        accepted: status,
      });
  
      console.log("Enquiry updated:", response.data.data);
      //update the status to re-render parent  
      enquiry.accepted = status;
      //close dialog 
      close();
    } catch (error) {
      console.error("Error updating enquiry:", error);
    }
  };
  
  //stops rendering if there is no trip and enquiry 
  if (!trip || !enquiry) {
    return null;
  }

  return (
    <Dialog fullWidth open={open}>
      <DialogTitle>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
          ENQUIRIES RECEIVED
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
          Enquiry status
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ padding: "0em 0.5em 0.5em 0.5em" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", textDecoration: "underline" }}>
            Status:
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-around", alignItems:"center"}}>
            {enquiry ? (
              enquiry.accepted === null ? (
                <Box sx={{ display: "flex", p: "0.5em 9em 0.5em 0.5em", alignItems:"center" }}>
                  <Icon icon="eos-icons:three-dots-loading" width="35" />
                  <Typography variant="body1" sx={{ pl: "0.5em" }}>
                    Pending
                  </Typography>
                </Box>
              ) : enquiry.accepted === true ? (
                <Box sx={{ display: "flex", p: "0.5em 9em 0.5em 0.5em", alignItems:"center" }}>
                  <Icon icon="subway:tick" color="green" width="20" />
                  <Typography variant="body1" sx={{ pl: "0.5em" }}>Accepted</Typography>
                </Box>
              ) : (
                <Box sx={{ display: "flex", p: "0.5em 9em 0.5em 0.5em", alignItems:"center" }}>
                  <Icon icon="foundation:x" color="red" width="20" />
                  <Typography variant="body1" sx={{ pl: "0.5em" }}>Declined</Typography>
                </Box>
              )
            ) : (
              ""
            )}
            <Button
            variant="filled"
              onClick={() => handleAccept(true)}
          
              sx={{
                "&:hover": {
                  backgroundColor: "green",
                  color: "white"
                },
              }}
            >
              Accept
            </Button>
            <Button variant="filled" onClick={() => handleAccept(false)} sx={{
                "&:hover": {
                  backgroundColor: "red",
                  color: "white"
                },
              }}>
              Decline
            </Button>
          </Box>
        </Box>
        <Box sx={{ padding: "0.5em" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", textDecoration: "underline" }}>
            Enquiry Details
          </Typography>
          <Typography variant="subtitle2">Created: {formatDate(enquiry.createdAt)}</Typography>
          <Typography variant="subtitle2">Updated: {formatDate(enquiry.updatedAt)}</Typography>
          <Typography variant="body2">Enquiry comment: </Typography>
          <Typography variant="body2">{enquiry.comments}</Typography>
        </Box>

        <Box sx={{ padding: "0.5em" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", textDecoration: "underline" }}>
            Your Trip Details
          </Typography>
          <Typography variant="body2">
            From: {trip.suburbFrom} {trip.cityFrom}, {trip.stateFrom}
          </Typography>
          <Typography variant="body2">
            To: {trip.suburbTo} {trip.cityTo}, {trip.stateTo}
          </Typography>
          <Typography variant="body2">Departure Date: {formatDate(trip.departureDate)}</Typography>
          <Typography variant="body2">Arrival Date: {formatDate(trip.arrivalDate)}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: "0.2em" }}> 
                      Starting price: ${trip.startingPrice}</Typography>

          <Box sx={{ display: "flex", mt: "0.3em" }}>
            <SizeInfoList />
            <Typography variant="body2" sx={{ ml: "0.5em", mt: "0.2em" }}>
              Available Space : {trip.availableSpace}
            </Typography>
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
