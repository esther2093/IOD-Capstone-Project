import { useState, useEffect } from "react";

function useUserData() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch all users
        const usersResponse = await fetch("http://localhost:8000/api/users");
        const usersResult = await usersResponse.json();

        if (usersResult.data) {
          setUsers(usersResult.data);
        } else {
          setError(new Error("No users found"));
        }

      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { users, error };
}

export default useUserData;
