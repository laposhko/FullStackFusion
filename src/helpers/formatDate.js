const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();

  if (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }
  const day = date.getDate();
  const month = date.toLocaleString("eng", { month: "long" });

  return `${day}, ${month}`;
};

export default formatDate;
