import { useState, useEffect } from "react";

function useEnquiryData() {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);

  //fetch data from API database
  useEffect(() => {
    const fetchData = async () => {
      try {
        //fetch enquiries data from database
        const enquiriesResponse = await fetch("/api/enquiries");
        const enquiriesResult = await enquiriesResponse.json();

        if (enquiriesResult.data) {
          //set state if data exists
          setEnquiries([...enquiriesResult.data]);
        } else {
          setError(new Error("No enquiries found"));
        }
      } catch (error) {
        setError(error);
      }
    };

    //call the function when the component renders
    fetchData();
  }, []);

  //return enquiries data and error for use
  return { enquiries, error };
}

export default useEnquiryData;
