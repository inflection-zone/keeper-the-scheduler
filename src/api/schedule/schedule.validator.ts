import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ScheduleValidator {

    static validateCronExprCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ScheduleName : joi.string().max(64).required(),
                StartDate    : joi.date().min(new Date()).iso().required(),
                EndDate      : joi.date().min(new Date()).iso().greater(joi.ref('StartDate')).required(),
                HookUri      : joi.string().uri().required(),
                CronRegEx    : joi.string().max(64).required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };

    static validateCronObjectCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ScheduleName : joi.string().max(64).required(),
                ScheduleType : joi.string().valid('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'),
                Frequency    : joi.number().integer().min(1).max(200).optional(),
                Minutes      : joi.number().integer().min(0).max(59).optional(),
                Hours        : joi.number().integer().min(0).max(23).optional(),
                DayOfMonth   : joi.number().integer().min(1).max(31).optional(),
                Month        : joi.number().integer().min(1).max(12).optional(),
                DayOfWeek    : joi.number().integer().min(0).max(6).optional(),
                StartDate    : joi.date().min(new Date()).iso().required(),
                EndDate      : joi.date().min(new Date()).iso().greater(joi.ref('StartDate')).required(),
                HookUri      : joi.string().uri().required(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

    static validateUpdateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ScheduleName : joi.string().max(64).required(),
                ScheduleType : joi.string().valid('HOURLY', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'),
                Frequency    : joi.number().integer().min(1).max(10).optional(),
                Minutes      : joi.number().integer().min(0).max(59).optional(),
                Hours        : joi.number().integer().min(0).max(23).optional(),
                DayOfMonth   : joi.number().integer().min(1).max(31).optional(),
                Month        : joi.number().integer().min(1).max(12).optional(),
                DayOfWeek    : joi.number().integer().min(0).max(7).optional(),
                StartDate    : joi.date().min(new Date()).iso().required(),
                EndDate      : joi.date().min(new Date()).iso().greater(joi.ref('StartDate')).required(),
                HookUri      : joi.string().uri().required(),
                CronRegEx    : joi.string().max(64).optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    }

}
