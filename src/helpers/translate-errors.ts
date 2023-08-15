import { ERROR_MESSAGES } from "../error-messages";
import { IValidationError } from "../models/validation-errors";


export function translateErrors(errors: IValidationError[]): IValidationError[] {
    errors.forEach((e) => {
        //@ts-ignore
        e.message = ERROR_MESSAGES[e.message];
    });

    return errors;
}