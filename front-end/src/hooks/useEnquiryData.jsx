import { useState, useEffect } from "react";

function useEnquiryData() {
  const [enquiries, setEnquiries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enquiriesResponse = await fetch("/api/enquiries");
        const enquiriesResult = await enquiriesResponse.json();

        if (enquiriesResult.data) {
            setEnquiries([...enquiriesResult.data]);

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