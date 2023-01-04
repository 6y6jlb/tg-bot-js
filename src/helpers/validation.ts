import { CreateTaskError } from "../exceptions/Task";
import { taskCreation } from "./regex";

export function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function taskTimeValidator(timeString: string) {
  const timeRegex = /^(?:[0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(timeString);
}

export function taskCreationValidator(message: string) {
  try {
    const [time, rusOption, engOption, trash, timezone] = taskCreation.exec(message)
    return { time, options: rusOption || engOption, timezone }
  } catch (error) {
    throw new CreateTaskError(`Message validation error ( ${message} )`)
  }

}