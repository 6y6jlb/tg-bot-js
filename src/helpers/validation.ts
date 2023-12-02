import { CreateTaskError } from "../exceptions/Task";
import { EXchangeError } from './../exceptions/Exchange';
import { commonCreationRequest, exhangeRateRequest, taskTime } from "./regex";

export function isNumeric(n: any) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function taskTimeValidator(timeString: string) {

  return taskTime.test(timeString);
}

export function commonTaskCreationValidator(message?: string) {
  try {
    if (!message) throw new CreateTaskError(`Message validation error ( message is undefined )`);
    const execResult = commonCreationRequest.exec(message);
    if (!execResult) {
      throw new CreateTaskError('No match found');
    }
    const [trashOne, time, trashTwo, trashThree, options, trashFour, timezone] = execResult;
    return { time: time.trim(), options: options.trim(), timezone: timezone.trim() }
  } catch (error) {
    throw new CreateTaskError(`Message validation error ( ${message} )`);
  }

}

export function exhangeRequestValidation(message?: string) {
  try {
    if (!message) throw new EXchangeError(`Message validation error ( message is undefined )`);
    const execResult = exhangeRateRequest.exec(message);
    if (!execResult) {
      throw new EXchangeError('No match found');
    }
    const [first, count, target, current] = execResult;
    return { count: count ? +count.trim() : 1, target: target.trim().toUpperCase(), current: current.trim().toUpperCase() }
  } catch (error) {
    throw new EXchangeError(`Message validation error ( ${message} )`);
  }
}