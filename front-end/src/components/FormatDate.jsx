//function to change the date format to be viewed DD/MM/YY
export default function FormatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = String(date.getFullYear()).slice(-2); // Get the last two digits of the year

  return `${day}/${month}/${year}`;
}

//function to change the date format to be viewed DD/MM/YYYY
export function FormatDateYYYY(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

