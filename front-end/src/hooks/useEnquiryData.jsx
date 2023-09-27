import { useState, useEffect } from "react";

function useEnquiryData() {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // fetch all enquiries
        const enquiriesResponse = await fetch("http://localhost:8000/api/enquiries");
        const enquiriesResult = await enquiriesResponse.json();

        if (enquiriesResult.data) {
            setEnquiries(enquiriesResult.data);
        } else {
          setError(new Error("No enquiries found"));
        }

      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  return { enquiries, error };
}

export default useEnquiryData;