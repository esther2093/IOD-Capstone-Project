import { useState, useEffect } from "react";

function useTripData(id) {
  const [allTrips, setAllTrips] = useState([]);
  const [trip, setTripData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all trips
        const allTripsResponse = await fetch("/api/trips");
        const allTripsResult = await allTripsResponse.json();

        if (allTripsResult.data) {
          setAllTrips([...allTripsResult.data]);
        } else {
          setError("No trips found");
        }

        // Fetch trip by id
        if (id) {
          const tripResponse = await fetch(`/api/trips/${id}`);
          const tripResult = await tripResponse.json();

          if (tripResult.data) {
            setTripData({ ...tripResult.data });
          } else {
            setError("Trip not found");
          }
        }

        setLoading(false); 
      } catch (error) {
        setError("An error occurred during data fetching: " + error.message);
        setLoading(false); 
      }
    };

    fetchData();
  }, [id]);

  return { allTrips, trip, error, loading };
}

export default useTripData;
