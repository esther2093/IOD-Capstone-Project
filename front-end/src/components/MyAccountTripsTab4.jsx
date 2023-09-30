import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useUserContext } from "../context/UserContext";
import useTripData from "../hooks/useTripData";
import useEnquiryData from "../hooks/useEnquiryData";
import useMessageData from "../hooks/useMessageData";
import useUserData from "../hooks/useUserData";
import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";

function TabPanel(props) {
  const { value, index, currentUser, users, userMessageGroups, onSendMessage } = props;

  const otherUserId = Object.keys(userMessageGroups)[value];
  const otherUser = users.find((user) => user.id === parseInt(otherUserId, 10));

  // Get messages for the current tab (otherUserId)
  const messagesForTab = userMessageGroups[otherUserId];
  console.log("messagesforTab:", messagesForTab);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    onSendMessage({
      senderId: currentUser.id,
      receiverId: otherUserId,
      content: newMessage,
    });

    setNewMessage("");
  };

  return (
    <Box role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} sx={{width: "100%"}}>
      <Box sx={{borderBottom: "0.13em rgba(0, 0, 0, 0.05) solid", mb: "1em"}}>
      <Typography variant="subtitle1" sx={{ p: "0.5em" }}>
        Your chat with {otherUser.firstName}
      </Typography>
      </Box>
      <Box sx={{ pl: "1em", pr:"1em" }}>
        {value === index && (
          <Box sx={{}}>
            {messagesForTab.map((message, messageIndex) => (
              <Box key={messageIndex} style={{ display: "flex", alignItems: "center", border: "0.1em solid black", borderRadius: "20px", padding: "0.5em", margin: "0.2em" }}>
                <Box sx={{ padding: "0.2em 0.5em 0.2em 0em" }}>
                  <Avatar
                    src={message.senderId === currentUser.id ? "http://localhost:8000/" + currentUser.profilePicture : otherUser ? "http://localhost:8000/" + otherUser.profilePicture : ""}
                    sx={{ width: 25, height: 25 }}
                  />
                </Box>
                <Typography variant="body1">{message.content}</Typography>
              </Box>
            ))}
            <Box sx={{ display: "flex", alignItems: "center", padding: "0.5em" }}>
              <TextField label="Message" variant="outlined" fullWidth value={newMessage} onChange={(event) => setNewMessage(event.target.value)} />

              <Button variant="filled" onClick={handleSendMessage} sx={{margin: "1em 0em 1em 1em"}}>
                Send
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  userMessages: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function TripsTab4() {
  const { currentUser } = useUserContext();
  const { users } = useUserData();
  console.log("users:", users);
  const { allTrips } = useTripData();
  const { enquiries } = useEnquiryData();
  const { messages } = useMessageData();

  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const userMessages = messages.filter((message) => message.senderId === currentUser.id || message.receiverId === currentUser.id);
  console.log(userMessages);

  const userMessageGroups = {};

  userMessages.forEach((message) => {
    const otherUserId = message.senderId === currentUser.id ? message.receiverId : message.senderId;

    if (!userMessageGroups[otherUserId]) {
      userMessageGroups[otherUserId] = [];
    }
    userMessageGroups[otherUserId].push(message);
  });
  console.log(userMessageGroups);

  const messageTabLabels = Object.keys(userMessageGroups);
  console.log(messageTabLabels);

  const otherUserDetails = {};

  messageTabLabels.forEach((otherUserId) => {
    const otherUser = users.find((user) => user.id === otherUserId);

    if (otherUser) {
      otherUserDetails[otherUserId] = {
        firstName: otherUser.firstName,
        lastName: otherUser.lastName,
        profilePicture: otherUser.profilePicture,
      };
    } else {
      otherUserDetails[otherUserId] = null;
    }
  });

  const handleSendMessage = async (message) => {

     if (!message || message.trim() === "") {
      // Handle the case where there's no message
      console.error("Message is empty");
      return;
    }
    
    try {
      const response = await axios.post("http://localhost:8000/api/messages/create", message);

      if (response.status === 200) {
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
    }
  };

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h6" className="section-subhead" sx={{ fontSize: "0.9em" }}>
          CHAT
        </Typography>
        <Typography variant="h4" className="section-title" sx={{ fontSize: "1.5em", fontWeight: 800 }}>
          Your Chats:
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", border: "0.13em rgba(0, 0, 0, 0.05) solid" }}>
        <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleTabChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}>
          {messageTabLabels.map((otherUserId, index) => {
            const otherUser = users.find((user) => user.id === parseInt(otherUserId, 10));
            return (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: "flex", alignItems: "left" }}>
                    <Avatar src={"http://localhost:8000/" + otherUser.profilePicture} sx={{ width: 20, height: 20 }} />
                    <Typography variant="body2">
                      {" "}
                      {otherUser.firstName} {otherUser.lastName}
                    </Typography>
                  </Box>
                }
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
        {messageTabLabels.map((otherUserId, index) => (
          <TabPanel key={index} value={value} index={index} userMessageGroups={userMessageGroups} 
          currentUser={currentUser} users={users} onSendMessage={handleSendMessage} />
        ))}
      </Box>
    </Box>
  );
}
