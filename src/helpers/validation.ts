import { EXchangeError } from './../exceptions/Exchange';
import { CreateTaskError } from "../exceptions/Task";
import { exhangeRequest, taskCreation, taskTime } from "./regex";

export function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function taskTimeValidator(timeString: string) {

  return taskTime.test(timeString);
}

export function taskCreationValidator(message: string) {
  try {
    const [trashOne, time, trashTwo, trashThree, options, trashFour, timezone] = taskCreation.exec(message)
    return { time: time.trim(), options: options.trim(), timezone: timezone.trim() }
  } catch (error) {
    throw new CreateTaskError(`Message validation error ( ${message} )`);
  }

}

export function exhangeRequestValidation(message: string) {
  try {
    const [first, count, target, current] = exhangeRequest.exec(message);
    return { count: count? +count.trim() : 1, target: target.trim().toUpperCase(), current: current.trim().toUpperCase() }
  } catch (error) {
    throw new EXchangeError(`Message validation error ( ${message} )`);
  }
}