import { useState, useEffect } from "react";

function useTripData(id) {
  const [allTrips, setAllTrips] = useState([]);
  const [tripData, setTripData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch all trips
        const allTripsResponse = await fetch("http://localhost:8000/api/trips");
        const allTripsResult = await allTripsResponse.json();

        if (allTripsResult.data) {
          setAllTrips(allTripsResult.data);
        } else {
          setError(new Error("No trips found"));
        }

        // fetch id specific
        if (id) {
          const response = await fetch(`http://localhost:8000/api/trips/${id}`);
          const result = await response.json();

          if (result.data) {
            setTripData(result.data);
          } else {
            setError(new Error("Trip not found"));
          }
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [id]);

  return { allTrips, tripData, error };
}

export default useTripData;
