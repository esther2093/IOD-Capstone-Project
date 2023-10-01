import axios from "axios";
import React, { useState } from "react";
import { Container, Box, Button } from "@mui/material";
import { useUserContext } from "../context/UserContext";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function ProfilePictureDialog() {
  const { currentUser, handleUpdateUser } = useUserContext();

  const [image, setImage] = useState({ preview: "", data: "" });
  const [submitResult, setSubmitResult] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const resetForm = () => {
    setImage({ preview: "", data: "" });
    setSubmitResult("");
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    resetForm();
    setOpenDialog(false);
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);

    try {
      const response = await axios.post(`http://localhost:8000/api/users/${currentUser.id}/image`, formData);
      setSubmitResult(response.data.result);
      handleUpdateUser({ ...currentUser, ...response.data.data });
      setError("");
    } catch (error) {
      setError("There was a problem uploading your picture. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: "1.5em",
      }}
    >
      <Button
        variant="filled"
        onClick={handleOpenDialog}
        sx={{
          padding: "0.3em 1em",
          fontSize: "0.8em",
        }}
      >
        CHANGE PICTURE
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
            CHANGE YOUR PROFILE PICTURE
          </Typography>
          <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
            Current picture
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Container component="main" sx={{ padding: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 300,
                textAlign: "center",
                color: "green",
                pb: "0.5em",
              }}
            >
              {submitResult}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 300,
                textAlign: "center",
                color: "red",
                pb: "0.5em",
              }}
            >
              {error}
            </Typography>
            <Avatar
              variant="square"
              sx={{
                m: 1,
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                margin: "auto",
              }}
            >
              <img src={"http://localhost:8000/" + currentUser.profilePicture} width="50%" alt={"NO PROFILE PICTURE"} />
            </Avatar>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                marginTop: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {image.preview && <img src={image.preview} width="100" height="100" />}
              <Box sx={{ pl: "4.9em" }}>
                <input name="photo" type="file" onChange={handleFileChange} />
              </Box>
              <Button
                type="submit"
                variant="filled"
                sx={{
                  color: "white",
                  my: "2em",
                  mx: "8em",
                  backgroundColor: "#D2B356",
                  "&:hover": {
                    backgroundColor: "#fff",
                    color: "#D2B356",
                    border: "none",
                  },
                }}
              >
                Submit
              </Button>
            </Box>
          </Container>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            DONE
          </Button>
        </DialogActions>

      </Dialog>
    </Box>
  );
}
