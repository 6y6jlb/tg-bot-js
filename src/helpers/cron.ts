export const convertDateToCronExpression = (date: Date) => {
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1; // months are zero-indexed
    const dayOfWeek = '*'; // all days of the week
    const command = '*'; // any command
  
    return `${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek} ${command}`;
  };