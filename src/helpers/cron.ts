export const convertDateToCronExpression = (date: Date, onlyTime = true) => {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const dayOfMonth = onlyTime ? '*' : date.getDate();
  const month = onlyTime ? '*' : date.getMonth() + 1; // months are zero-indexed
  const dayOfWeek = '*'; // all days of the week

  return `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`;
};