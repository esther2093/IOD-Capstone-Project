import React, { useState } from "react";
import { TextField, Button, Box, Grid } from "@mui/material";
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
    console.log("curentuser id", currentUser.id);
    data.append("tripId", tripId);
    console.log("current tripId", tripId);

    console.log("Submitting data:", Object.fromEntries(data.entries()));

    axios
      .post("http://localhost:8000/api/enquiries/register", Object.fromEntries(data.entries())) // Send the enquiry object
      .then((response) => {
        let result = response.data.result;
        const enquiry = response.data.data;

        setSubmitResult(result);
        if (enquiry) {
          setErrorMsg("");
          event.target.reset()
        }
      })
      .catch((errorMsg) => {
        console.error(errorMsg);
        setErrorMsg(errorMsg.response.data.result);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmitEnquiry} sx={{width: "100%"}}>
      <Grid item xs={12} >
      <TextField required name="comments" label="Comments" id="comments" fullWidth multiline rows={4} margin="normal" variant="outlined" />
      <Button type="submit" variant="contained" sx={{ backgroundColor: "#D2B356", marginTop: "1em" }}>
        Submit Enquiry
      </Button>
      {submitResult && <div>{submitResult}</div>}
      {errorMsg && <div>{errorMsg}</div>}
      </Grid>
    </Box>
  );
}
