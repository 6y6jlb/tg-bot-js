import { TaskError } from "../../exceptions/Task";
import { commonTaskCreationValidator, exhangeRequestValidation } from "../../helpers/validation";
import { EVENT_ENUM } from "../../models/const";

class TaskCreateValidator {
    type: EVENT_ENUM;

    constructor(type: EVENT_ENUM) {
        this.type = type;
    }

    validate(message?: string) {
        switch (this.type) {
            case EVENT_ENUM.EXCHANGE:
            case EVENT_ENUM.WEATHER:
            case EVENT_ENUM.REMINDER:
                return commonTaskCreationValidator(message);

            default:
                throw new TaskError('Incorrect validator type: ' + this.type);
        }
    }
}

export default TaskCreateValidator
