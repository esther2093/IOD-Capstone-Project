import React, { useState } from "react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

export default function EnquiryForm(props) {
  const { currentUser, handleUpdateUser } = useUserContext();
  const { tripId } = props;

  const [errorMsg, setErrorMsg] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [formVisible, setFormVisible] = useState(true);

  const handleSubmitEnquiry = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSubmitResult("");

    const data = new FormData(event.currentTarget);
    data.append("userId", currentUser.id);
    // console.log("currentUser id", currentUser.id);
    data.append("tripId", tripId);
    // console.log("currentTripId", tripId);

    console.log("Submitting data:", Object.fromEntries(data.entries()));

    axios
      .post("http://localhost:8000/api/enquiries/register", Object.fromEntries(data.entries())) // Send the enquiry object
      .then((response) => {
        let result = response.data.result;
        const enquiry = response.data.data;

        setSubmitResult(result);
        if (enquiry) {
          setErrorMsg("");
          setFormVisible(false);
        }
      })
      .catch((errorMsg) => {
        console.error(errorMsg);
        setErrorMsg(errorMsg.response.data.result);
      });
  };

  return (
    <Box>
      {formVisible ? ( 
        <Box component="form" onSubmit={handleSubmitEnquiry} sx={{ textAlign: "center", mt: "1.5em" }}>
          <Box>
            <Typography variant="body2" color="red">
              {errorMsg}
            </Typography>
            <Typography variant="body2" color="green">
              {submitResult}
            </Typography>
          </Box>
          <Grid item xs={12} sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h6" className="section-subhead" sx={{ textAlign: "left", fontSize: "0.6em" }}>
              ENQUIRE
            </Typography>
            <Typography variant="h4" className="section-title" sx={{ textAlign: "left", fontSize: "1em", fontWeight: 800 }}>
              Let the parceler know what you want to send:
            </Typography>
            <TextField required name="comments" label="Comments" id="comments" fullWidth multiline rows={4} margin="normal" variant="outlined" />
            <Button
              type="submit"
              variant="filled"
              sx={{
                marginTop: "0.5em",
              }}
            >
              PARCEL IT
            </Button>
          </Grid>
        </Box>
      ) : (
        <Typography variant="body2" color="green" sx={{ mt: "1em" }}>
          {submitResult}
        </Typography>
      )}
    </Box>
  );
}
