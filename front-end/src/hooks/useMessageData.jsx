import { useState, useEffect } from "react";

function useMessageData() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  //fetch data from API database
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch messages data from database
        const messagesResponse = await fetch("/api/messages");
        const messagesResult = await messagesResponse.json();

        if (messagesResult.data) {
          //set state if data exists
          setMessages([...messagesResult.data]);
        } else {
          setError(new Error("No messages found"));
        }
      } catch (error) {
        setError(error);
      }
    };
    //call the function when the component renders
    fetchData();
  }, []);

  //return messages data and error for use
  return { messages, error };
}

export default useMessageData;
