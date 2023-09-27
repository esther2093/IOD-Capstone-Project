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
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const { currentUser, handleUpdateUser } = useUserContext();
  const [loggedIn, setLoggedIn] = React.useState(currentUser.firstName);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    resetForm();
    setOpen(false);
  };

  const resetForm = () => {
    setImage({ preview: "", data: "" });
    setStatus("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("file", image.data);

    try {
      const response = await axios.post(`http://localhost:8000/api/users/${currentUser.id}/image`, formData);
      console.log(response.data);
      setStatus(response.data.result);
      handleUpdateUser({ ...currentUser, ...response.data.data });
    } catch (err) {
      setStatus(err.message);
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mb: "1em",
      }}
    >
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          border: 1,
          padding: "0.3em 1em",
          fontSize: "0.8em",
          "&:hover": {
            color: "#d2b356",
            border: "1px #d2b356 solid",
          },
        }}
      >
        Update Profile Picture
      </Button>
      
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <DialogTitle id="responsive-dialog-title">
            <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.6em" }}>
              CHANGE YOUR PROFILE PICTURE
            </Typography>
            <Typography variant="h4" className="section-title" sx={{ fontSize: "1em", fontWeight: 800 }}>
              Current picture
            </Typography>
          </DialogTitle>

          <Container component="main" sx={{ pl: 0 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 300,
                textAlign: "center",
                color: "green",
              }}
            >
              {status}
            </Typography>
            <Avatar
              q
              variant="square"
              sx={{
                m: 1,
                width: "100%",
                height: "100%",
                margin: 0,
                backgroundColor: "white",
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
              <Button type="submit" variant="filled" sx={{ mt: 3, mb: 2 }}>
                Submit
              </Button>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            DONE
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
