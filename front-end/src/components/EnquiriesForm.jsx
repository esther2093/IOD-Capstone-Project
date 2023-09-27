import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function EnquiryForm() {
  const [enquiry, setEnquiry] = useState();
  const [submitResult, setSubmitResult] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { currentUser, handleUpdateUser } = useUserContext();

  const handleSubmitEnquiry = (event) => {
    event.preventDefault();
    setErrorMsg("");
    setSubmitResult("");

    const data = new FormData(event.currentTarget);
    data.append("userId", currentUser.id);

    axios
      .post("http://localhost:8000/api/enquiries/register", enquiry) // Send the enquiry object
      .then((response) => {
        let result = response.data.result;

        if (result === "success") {
          setSubmitResult("You've successfully submitted your enquiry!");
          // Optionally, you can redirect the user to a different page after submission.
          // navigate("/some-other-page");
        } else {
          setErrorMsg("Enquiry submission failed.");
        }
      })
      .catch((errorMsg) => {
        console.error(errorMsg);
        setErrorMsg(errorMsg.response.data.result);
      });
  };

  return (
    <form onSubmit={handleSubmitEnquiry}>
      <TextField name="comments" label="Comments" fullWidth multiline rows={4} margin="normal" variant="outlined" />
      <Button type="submit" variant="contained" sx={{ backgroundColor: "#D2B356", marginTop: "1em" }}>
        Submit Enquiry
      </Button>
      {submitResult && <div>{submitResult}</div>}
      {errorMsg && <div>{errorMsg}</div>}
    </form>
  );
}
