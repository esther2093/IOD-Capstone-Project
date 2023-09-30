import { useState, useEffect } from "react";

function useMessageData() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch all messages
        const messagesResponse = await fetch("http://localhost:8000/api/messages");
        const messagesResult = await messagesResponse.json();
        console.log(messagesResult)

        if (messagesResult.data) {
            setMessages(messagesResult.data);

        } else {
          setError(new Error("No messages found"));
        }

      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { messages, error };
}

export default useMessageData;