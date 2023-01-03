export function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function taskTimeValidator(timeString: string) {
  const timeRegex = /^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
}