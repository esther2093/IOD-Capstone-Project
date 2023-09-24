import { useState, useEffect } from "react";

function useTripData() {
  const [allTrips, setAllTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch trip data
        const tripResponse = await fetch("http://localhost:8000/api/trips");
        const tripResult = await tripResponse.json();
        if (tripResult.data) {
          setAllTrips(tripResult.data);
          setFilteredTrips(tripResult.data);
        }
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchData();
  }, []);

  return { allTrips, filteredTrips };
}

export default useTripData;
