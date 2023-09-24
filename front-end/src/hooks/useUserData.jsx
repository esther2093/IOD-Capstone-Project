import { useState, useEffect } from "react";

function useUserData(id) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
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

        // fetch id specific
        if (id) {
          const userResponse = await fetch(`http://localhost:8000/api/users/${id}`);
          const userResult = await userResponse.json();

          if (userResult.data) {
            setSelectedUser(userResult.data);
          } else {
            setSelectedUser(null); // User not found
          }
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  return { users, selectedUser, error };
}

export default useUserData;
