import { useState, useEffect } from "react";

function useTripData(id) {
  const [allTrips, setAllTrips] = useState([]);
  const [trip, setTripData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all trips
        const allTripsResponse = await fetch("http://localhost:8000/api/trips");
        const allTripsResult = await allTripsResponse.json();
        console.log(allTripsResult);

        if (allTripsResult.data) {
          setAllTrips([...allTripsResult.data]); 
        } else {
          setError("No trips found"); 
        }

        // Fetch trip by id
        if (id) {
          const tripResponse = await fetch(`http://localhost:8000/api/trips/${id}`);
          const tripResult = await tripResponse.json();
          console.log(tripResult);

          if (tripResult.data) {
            setTripData({ ...tripResult.data }); 
          } else {
            setError("Trip not found");
          }
        }
      } catch (error) {
        setError("An error occurred during data fetching: " + error.message); 
      }
    };

    fetchData();
  }, [id]);

  return { allTrips, trip, error };
}

export default useTripData;
