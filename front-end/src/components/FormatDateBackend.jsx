export default function FormatDateBackend(date) {
    const newDate = new Date(date);

    const year = newDate.getUTCFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(newDate.getDate()).padStart(2, '0');
  
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }