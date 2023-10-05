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

// Mui component function for tabs 
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
  const [userDetails, setUserDetails] = useState({}); // New state for user details

  // Handle tab changing
  const handleTabChange = (e, newValue) => {
    setValue(newValue);
  };

  // Populate userMessageGroups and messageTabLabels
  useEffect(() => {
    // Filter messages that include the currentUser either receiver or sender
    const userMessages = messages.filter((message) => message.senderId === currentUser.id || message.receiverId === currentUser.id);
    // Initialize an empty object to group messages
    const groups = {};

    // Groups messages based on the other user's id
    userMessages.forEach((message) => {
      const otherUserId = message.senderId === currentUser.id ? message.receiverId : message.senderId;

      // If group doesn't exist for other user id then create a new array
      if (!groups[otherUserId]) {
        groups[otherUserId] = [];
      }
      groups[otherUserId].push(message);
    });

    // Groups set
    setUserMessageGroups(groups);
    // Message tab labels are set with the key of groups which is the otherUserId
    setMessageTabLabels(Object.keys(groups));
  }, [currentUser.id, messages]);

  // Fetch user details sequentially for each user
  useEffect(() => {
    const fetchUserDetails = async () => {
      const userDetails = {};

      for (const otherUserId of messageTabLabels) {
        const otherUser = users.find((user) => user.id === parseInt(otherUserId, 10));
        if (otherUser) {
          userDetails[otherUserId] = {
            firstName: otherUser.firstName,
            lastName: otherUser.lastName,
            profilePicture: otherUser.profilePicture,
          };
        } else {
          userDetails[otherUserId] = null;
        }
      }

      setUserDetails(userDetails);
    };

    fetchUserDetails();
  }, [messageTabLabels, users]);

  // Handle to update the appropriate group with a new message
  const handleNewMessage = (newMessage) => {
    // Convert ids from strings to numbers
    const numberMessage = {
      id: newMessage.id,
      senderId: parseInt(newMessage.senderId),
      receiverId: parseInt(newMessage.receiverId),
      content: newMessage.content,
    };

    setUserMessageGroups((prevGroups) => {
      // Create a copy of previous groups
      const updatedGroups = { ...prevGroups };

      // Find the id of the other user in the group
      const otherUserId = numberMessage.senderId === currentUser.id ? numberMessage.receiverId : numberMessage.senderId;
      // If the group doesn't exist for the other user id then create a new array
      if (!updatedGroups[otherUserId]) {
        updatedGroups[otherUserId] = [];
      }
      // Push the new message into the group with the otherUserId
      updatedGroups[otherUserId].push(numberMessage);
      // Updated state returned
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
                      <Avatar src={userDetails[otherUserId]?.profilePicture} sx={{ width: 20, height: 20 }} />
                      <Typography variant="body2" sx={{ width: "100%", ml: "0.5em" }}>
                        {userDetails[otherUserId]?.firstName}
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
            You don't have any active chats at the moment
          </Typography>
        )}
        {messageTabLabels.length > 0 &&
          messageTabLabels.map((otherUserId, index) => (
            <ChatMessages
              key={index}
              value={value}
              index={index}
              otherUserId={otherUserId}
              userMessageGroups={userMessageGroups}
              currentUser={currentUser}
              users={users}
              setUpdateList={handleNewMessage}
            />
          ))}
      </Box>
    </Box>
  );
}
