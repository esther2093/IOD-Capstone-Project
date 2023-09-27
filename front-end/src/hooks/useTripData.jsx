import { useState, useEffect } from "react";

function useTripData(id) {
  const [allTrips, setAllTrips] = useState([]);
  const [trip, setTripData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch all trips
        const allTripsResponse = await fetch("http://localhost:8000/api/trips");
        const allTripsResult = await allTripsResponse.json();
        console.log(allTripsResult)

        if (allTripsResult.data) {
          setAllTrips(allTripsResult.data);
          
        } else {
          setError(new Error("No trips found"));
        }

        // fetch id specific
        if (id) {
          const tripResponse = await fetch(`http://localhost:8000/api/trips/${id}`);
          const tripResult = await tripResponse.json();
          console.log(tripResult)

          if (tripResult.data) {
            setTripData(tripResult.data);
            ;
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

  return { allTrips, trip, error };
}

export default useTripData;
