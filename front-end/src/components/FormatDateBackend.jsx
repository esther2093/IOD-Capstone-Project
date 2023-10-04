
//function to format date to match database date requirement YYYY-MM-DD
export default function FormatDateBackend(date) {
    const newDate = new Date(date);

    const year = newDate.getUTCFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(newDate.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  //function to reverse format date from database date to front-end DD-MM-YYYY
  export function FormatDateBackendReverse(dateString) {
    const dateObj = new Date(dateString);
    const day = String(dateObj.getUTCDate()).padStart(2, '0');
    const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = dateObj.getUTCFullYear();
  
    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate;

    
  }
  
  
  