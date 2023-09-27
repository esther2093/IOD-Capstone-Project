export default function formatDate(dateString) {
  const date = new Date(dateString);
  // console.log(date);
  return date.toLocaleDateString();

}
