import { useState } from 'react';

function useDataRefresh() {
  const [dataRefresh, setDataRefresh] = useState(false);
  const [error, setError] = useState(null);

  // Function to trigger a page refresh
  const refreshData = () => {
    setDataRefresh((prevFlag) => !prevFlag);
  };

  return { refreshData };
}

export default useDataRefresh;
