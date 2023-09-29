import React, { useState } from "react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

export default function EnquiryForm(props) {
  const { currentUser, handleUpdateUser } = useUserContext();
  const { tripId } = props;

  const [errorMsg, setErrorMsg] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const handleSubmitEnquiry = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSubmitResult("");

    const data = new FormData(event.currentTarget);
    data.append("userId", currentUser.id);
    // console.log("curentuser id", currentUser.id);
    data.append("tripId", tripId);
    // console.log("current tripId", tripId);

    console.log("Submitting data:", Object.fromEntries(data.entries()));

    axios
      .post("http://localhost:8000/api/enquiries/register", Object.fromEntries(data.entries())) // Send the enquiry object
      .then((response) => {
        let result = response.data.result;
        const enquiry = response.data.data;

        setSubmitResult(result);
        if (enquiry) {
          setErrorMsg("");
          event.target.reset();
        }
      })
      .catch((errorMsg) => {
        console.error(errorMsg);
        setErrorMsg(errorMsg.response.data.result);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmitEnquiry} sx={{ width: "100%", textAlign: "center", border: "1px #D2B356 dotted", p: "1em", my:"1em" }}>
      {errorMsg && (
        <Typography variant="body2" color="red">
          {errorMsg}
        </Typography>
      )}
      {submitResult && (
        <Typography variant="body2" color="green">
          {submitResult}
        </Typography>
      )}
      <Grid item xs={12} sx={{ justifyContent: "center", alignItems: "center" }}>
        <TextField required name="comments" label="Comments" id="comments" fullWidth multiline rows={4} margin="normal" variant="outlined" />
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#D2B356",
            "   &:hover": {
              backgroundColor: "#fff",
              color: "#D2B356",
            },
            marginTop: "0.5em",
          }}
        >
          SEND IT!
        </Button>
      </Grid>
    </Box>
  );
}