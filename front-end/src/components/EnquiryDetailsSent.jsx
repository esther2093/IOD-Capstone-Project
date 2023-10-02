import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import formatDate from "./FormatDate";
import { Box } from "@mui/material";
import SizeInfoList from "./sizeInfoList";
import useUserData from "../hooks/useUserData";

export default function EnquiryDetailsSent({ open, close, enquiry, trip }) {
  const { users } = useUserData();
  const [userFirstNames, setUserFirstNames] = useState([]);

  useEffect(() => {
    const firstNamesArray = users.map((user) => user.firstName);
    setUserFirstNames(firstNamesArray);
  }, [users]);

  if (!trip || !enquiry) {
    return null; // or render a loading indicator
  }

  return (
    <Dialog fullWidth open={open} onClose={close}>
      <DialogTitle>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
          ENQUIRIES SENT
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
          Enquiry details
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ padding: "0em 0.5em 0.5em 0.5em" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", textDecoration:"underline" }}>
            Trip Details
          </Typography>
          <Typography variant="body2">Parceler: {userFirstNames[trip.userId - 1]}</Typography>
          <Typography variant="body2">
            From: {trip.suburbFrom} {trip.cityFrom}, {trip.stateFrom}
          </Typography>
          <Typography variant="body2">
            To: {trip.suburbTo} {trip.cityTo}, {trip.stateTo}
          </Typography>
          <Typography variant="body2">Departure Date: {formatDate(trip.departureDate)}</Typography>
          <Typography variant="body2">Arrival Date: {formatDate(trip.arrivalDate)}</Typography>
          <Box sx={{ display: "flex", mt: "0.3em" }}>
            <SizeInfoList />
            <Typography variant="body2" sx={{ ml: "0.5em", mt: "0.2em" }}>
              Available Space : {trip.availableSpace}
            </Typography>
          </Box>
          <Typography variant="body2">Comments: </Typography>
          <Typography variant="body2">{trip.comments}</Typography>
        </Box>
        <Box sx={{ padding: "0.5em" }}>
          <Typography variant="body1" sx={{ fontWeight: "500", textDecoration:"underline" }}>
            Enquiry Details
          </Typography>
          <Typography variant="subtitle2" sx={{color: "grey"}}>Created: {formatDate(enquiry.createdAt)}</Typography>
          <Typography variant="subtitle2" sx={{color: "grey"}}>Updated: {formatDate(enquiry.updatedAt)}</Typography>
          <Typography variant="body2">Enquiry comment: </Typography>
          <Typography variant="body2">{enquiry.comments}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} variant="outlined">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
