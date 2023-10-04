import { useState, useEffect } from "react";

function useTripData(id) {
  const [allTrips, setAllTrips] = useState([]);
  const [trip, setTripData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //fetch data from API database
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all trips data from database
        const allTripsResponse = await fetch("/api/trips");
        const allTripsResult = await allTripsResponse.json();

        if (allTripsResult.data) {
          //set state if data exists
          setAllTrips([...allTripsResult.data]);
        } else {
          setError("No trips found");
        }

        // Fetch trip data by id from database
        if (id) {
          const tripResponse = await fetch(`/api/trips/${id}`);
          const tripResult = await tripResponse.json();

          if (tripResult.data) {
            //set state if data exists
            setTripData({ ...tripResult.data });
          } else {
            setError("Trip not found");
          }
        }
        //set loading to false when data is fetched
        setLoading(false);
      } catch (error) {
        setError("An error occurred during data fetching: " + error.message);
        //set loading to false when there is an error
        setLoading(false);
      }
    };
    //call the function when the component renders
    fetchData();
  }, [id]);

  return { allTrips, trip, error, loading };
}

export default useTripData;
