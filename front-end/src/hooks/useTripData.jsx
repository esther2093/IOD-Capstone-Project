import { useState, useEffect } from "react";

function useTripData() {
  const [allTrips, setAllTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = [];

      try {
        // Fetch trip data
        const response = await fetch("http://localhost:8000/api/trips");
        const result = await response.json();

        if (result.data) {
          data.push(...result.data);
          
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
      
      setAllTrips(data);
    };

    fetchData();
  }, []);

  return { allTrips };
}

export default useTripData;
