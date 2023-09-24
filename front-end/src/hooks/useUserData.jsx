import { useState, useEffect } from "react";

function useUserData() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data
        const userResponse = await fetch("http://localhost:8000/api/users");
        const userResult = await userResponse.json();
        if (userResult.data) {
          setUsers(userResult.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return { users };
}

export default useUserData;
