import { useState, useEffect } from "react";

export function useData(url, initialValue =[] ) {
 
  const [data, setData] = useState(initialValue);

  useEffect(() => {
    if (url) {
      let ignore = false;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          if (!ignore) {
            setData(json);
          }
        });

    
      return () => {
        ignore = true;
      };
    }
  }, [url]); 

  return data;
}
