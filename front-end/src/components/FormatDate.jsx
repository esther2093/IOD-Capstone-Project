export default function formatDate(dateString) {
  const date = new Date(dateString);

  // Extract day, month, and year components
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  // Construct the "DD/MM/YYYY" format
  return `${day}/${month}/${year}`;
}
