import React from "react";
import { TextField, Button } from "@mui/material";

export default function EnquiryForm() {
  const { trip } = useTripData();
  const { users } = useUserData();

  const [submitResult, setSubmitResult] = useState("");

  const handleEnquiryChange = (e) => {
    const { name, value } = e.target;
    setEnquiry((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [enquiry, setEnquiry] = useState();

  const handleSubmitEnquiry = () => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios
      .post("http://localhost:8000/api/enquiries/register", Object.fromEntries(data.entries()))
      .then((response) => {
        let result = response.data.result;
        let enquiry = response.data.data;

        setSubmit(result);
        if (enquiry) {
          setSubmitResult("You've sucessfully signed up! You will be redirected to the homepage in a few seconds...");
          navigate("/login");
        }
      })
      .catch((error) => {
        //console.log(error);
        setError(error.response.data.result);
      });
  };

  return (
    <form onSubmit={handleSubmitEnquiry}>
      <TextField name="itemToSend" label="Item to Send" fullWidth value={enquiry.itemToSend} onChange={handleEnquiryChange} margin="normal" variant="outlined" />
      <TextField name="comments" label="Comments" fullWidth multiline rows={4} value={enquiry.comments} onChange={handleEnquiryChange} margin="normal" variant="outlined" />
      <Button type="submit" variant="contained" sx={{ backgroundColor: "#D2B356", marginTop: "1em" }}>
        Submit Enquiry
      </Button>
    </form>
  );
}
