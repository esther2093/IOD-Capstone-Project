import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useUserContext } from "../context/UserContext";
import useMessageData from "../hooks/useMessageData";
import useUserData from "../hooks/useUserData";
import { Avatar } from "@mui/material";
import ChatMessages from "./ChatMessages";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function TripsTab4() {
  const { currentUser } = useUserContext();
  const { users } = useUserData();
  const { messages } = useMessageData();

  const [value, setValue] = useState(0);
  const [userMessageGroups, setUserMessageGroups] = useState({});
  const [messageTabLabels, setMessageTabLabels] = useState([]);

  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };



  useEffect(() => {
    const userMessages = messages.filter((message) => message.senderId === currentUser.id || message.receiverId === currentUser.id);
    const groups = {};

    userMessages.forEach((message) => {
      const otherUserId = message.senderId === currentUser.id ? message.receiverId : message.senderId;

      if (!groups[otherUserId]) {
        groups[otherUserId] = [];
      }
      groups[otherUserId].push(message);
    });

    setUserMessageGroups(groups);
    setMessageTabLabels(Object.keys(groups));

  }, [currentUser.id, messages ]);

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

  const handleNewMessage = (newMessage) => {
    //convert strings to numbers
    const numberMessage = {
      id: newMessage.id,
      senderId: parseInt(newMessage.senderId),
      receiverId: parseInt(newMessage.receiverId),
      content: newMessage.content,
    }
    setUserMessageGroups((prevGroups) => {
      const updatedGroups = { ...prevGroups };
  
      const otherUserId = numberMessage.senderId === currentUser.id ? numberMessage.receiverId : numberMessage.senderId;
      if (!updatedGroups[otherUserId]) {
        updatedGroups[otherUserId] = [];
      }
      updatedGroups[otherUserId].push(numberMessage);
      return updatedGroups;
    });
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
  
      <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", border: "0.13em rgba(0, 0, 0, 0.05) solid", maxHeight: 370 }}>
        {messageTabLabels.length > 0 ? (
          <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleTabChange} aria-label="Vertical tabs example" sx={{ borderRight: 1, borderColor: "divider" }}>
            {messageTabLabels.map((otherUserId, index) => {
              const otherUser = users.find((user) => user.id === parseInt(otherUserId, 10));
              return (
                <Tab
                  key={index}
                  label={
                    <Box sx={{ display: "flex", alignItems: "left", padding: "0.5em", mr: "1em" }}>
                      <Avatar src={"http://localhost:8000/" + otherUser.profilePicture} sx={{ width: 20, height: 20 }} />
                      <Typography variant="body2" sx={{ width: "100%", ml: "0.5em" }}>
                        {otherUser.firstName}
                      </Typography>
                    </Box>
                  }
                  {...a11yProps(index)}
                />
              );
            })}
          </Tabs>
        ) : (
          <Typography variant="body1" sx={{ padding: "0.5em 1em 2em 0.5em" }}>
            You do not have any active chats at the moment.
          </Typography>
        )}
        {messageTabLabels.length > 0 &&
          messageTabLabels.map((otherUserId, index) => (
            <ChatMessages key={index} value={value} index={index} otherUserId={otherUserId} userMessageGroups={userMessageGroups} 
            currentUser={currentUser} users={users} setUpdateList={handleNewMessage}/>
          ))}
      </Box>
    </Box>
  );
  
}
