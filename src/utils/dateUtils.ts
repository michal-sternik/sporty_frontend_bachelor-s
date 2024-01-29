const convertToFormattedDateString = (dateString: string) => {
  const date =
    dateString.charAt(dateString.length - 1) === 'Z'
      ? new Date(`${dateString}`)
      : new Date(`${dateString}Z`);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

  return formattedDate;
};

export default convertToFormattedDateString;
