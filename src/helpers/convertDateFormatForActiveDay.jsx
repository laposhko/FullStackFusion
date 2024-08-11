export function convertDateFormatForActiveDay(dateString) {
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(dateString)) {
    return dateString;
  }
  console.log(dateString);
  const [month, day, year] = dateString.split("-");
  console.log(month, day, year);
  const paddedDay = day.padStart(2, "0");
  const paddedMonth = month.padStart(2, "0");

  const formattedDate = `${paddedDay}.${paddedMonth}.${year}`;

  return formattedDate;
}

export function convertDateIntoStringFormat(dateNow) {
  const formattedDay = String(dateNow.getDate()).padStart(2, "0");
  const year = dateNow.getFullYear();
  const formattedMonth = String(dateNow.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
  return formattedDate;
}
