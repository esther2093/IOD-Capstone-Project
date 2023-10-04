import React, { useState } from "react";
import { TextField, Button, Box, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useUserContext } from "../context/UserContext";

export default function EnquiryForm({tripId}) {
  const { currentUser } = useUserContext();

  const [error, setError] = useState("");
  const [submitResult, setSubmitResult] = useState("");
  const [formVisible, setFormVisible] = useState(true);

  //handle submit of new enquiry 
  const handleSubmitEnquiry = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitResult("");
  
    try {
      //creating new enquiry data
      const data = new FormData(event.currentTarget);
      data.append("userId", currentUser.id);
      data.append("tripId", tripId);
      
      //post new enquriy to database
      const response = await axios.post("/api/enquiries/register", Object.fromEntries(data.entries()));
  
      let result = response.data.result;
      const enquiry = response.data.data;
  
      if (enquiry) {
        setSubmitResult(result);
        setError("");
        //hides the form after sucessful submit 
        setFormVisible(false);
      }
    } catch (error) {
      setError(error.response ? error.response.data.result : "An error occurred");
    }
  };
  
  return (
    <Box>
      {formVisible ? ( 
        <Box component="form" onSubmit={handleSubmitEnquiry} sx={{ textAlign: "center", mt: "1.5em" }}>
          <Grid item xs={12} sx={{ justifyContent: "center", alignItems: "center" }}>
            <Typography variant="h6" className="section-subhead" sx={{ textAlign: "left", fontSize: "0.6em" }}>
              ENQUIRE
            </Typography>
            <Typography variant="h4" className="section-title" sx={{ textAlign: "left", fontSize: "1em", fontWeight: 800 }}>
              Make a request: 
            </Typography>
            <TextField required name="comments" label="Comments" id="comments" fullWidth multiline rows={4} margin="normal" variant="outlined" />
            <Button
              type="submit"
              variant="filled"
              sx={{
                marginTop: "0.5em",
              }}
            >
              PARCELME
            </Button>
          </Grid>
        </Box>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center"}}>
            <Typography variant="body2" color="red">
              {error}
            </Typography>
            <Typography variant="body2" color="green" sx={{ mt: "1em" }}>
          {submitResult}
        </Typography>
          </Box>
      
      )}
    </Box>
  );
}
