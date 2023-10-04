import { useState, useEffect } from "react";

export default function useUserData(id) {
  const [users, setUsers] = useState([]);
  const [user, setUserData] = useState(null);
  const [error, setError] = useState(null);

   //fetch data from API database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users from database
        const usersResponse = await fetch("/api/users");
        const usersResult = await usersResponse.json();

        if (usersResult.data) {
          //set state if data exists
          setUsers([...usersResult.data]);
        } else {
          setError("No users found");
        }

        // Fetch user by id from database
        if (id) {
          const userResponse = await fetch(`/api/users/${id}`);
          const userResult = await userResponse.json();

          if (userResult.data) {
            //set state if data exists
            setUserData({ ...userResult.data });
          } else {
            setError("User not found");
          }
        }
      } catch (error) {
        setError("An error occurred during data fetching: " + error.message);
      }
    };

    fetchData();
  }, [id]);

  return { users, user, error };
}

