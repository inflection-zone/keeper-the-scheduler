import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class ScheduleValidator {

    static validateCronExprCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                ScheduleName : joi.string().max(64).required(),
                // ScheduleType : joi.string().valid('HOURLY', 'DAILY','WEEKLY','MONTHLY','YEARLY'),
                // Frequency    : joi.number().integer().min(1).max(10).optional(),
                // Minutes      : joi.number().integer().min(0).max(59).optional(),
                // Hours        : joi.number().integer().min(0).max(23).optional(),
                // DayOfMonth   : joi.number().integer().min(1).max(31).optional(),
                // Month        : joi.number().integer().min(1).max(12).optional(),
                //DayOfWeek    : joi.number().integer().min(0).max(7).optional(),
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
    // static validateSearchRequest = async (query) => {
    //     try {
    //         const schema = joi.object({
    //             roleId: joi.number().integer().optional(),
    //             biocubeId: joi.string().max(16).optional(),
    //             prefix: joi.string().max(16).optional(),
    //             firstName: joi.string().max(64).optional(),
    //             lastName: joi.string().max(64).optional(),
    //             gender: joi.string().valid('Male', 'Female', 'Other').optional(),
    //             state: joi.string().max(64).optional(),
    //             country: joi.string().max(64).optional(),
    //             address: joi.string().max(256).optional(),
    //             addedByUserId: joi
    //                 .string()
    //                 .guid({
    //                     version: ['uuidv4'],
    //                 })
    //                 .optional(),
    //             lastUpdatedByUserId: joi
    //                 .string()
    //                 .guid({
    //                     version: ['uuidv4'],
    //                 })
    //                 .optional(),
    //         });
    //         return await schema.validateAsync(query);
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

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

    // static validatePasswordChangeRequest = async (requestBody) => {
    //     try {
    //         const schema = joi.object({
    //             CurrentUserId: joi
    //                 .string()
    //                 .guid({ version: ['uuidv4'] })
    //                 .required(),
    //             OldPassword: joi.string().required(),
    //             NewPassword: joi.string().required(),
    //         });
    //         return await schema.validateAsync(requestBody);
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

    // static validateResetPasswordLinkRequest = async (requestBody) => {
    //     try {
    //         const schema = joi.object({
    //             Email: joi.string().email().required(),
    //         });
    //         return await schema.validateAsync(requestBody);
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

    // static validateSetPasswordRequest = async (requestBody) => {
    //     try {
    //         const schema = joi.object({
    //             ResetPasswordToken: joi.string().required(),
    //             Password: joi.string().required(),
    //         });
    //         return await schema.validateAsync(requestBody);
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

    // static validateLoginWithPasswordRequest = async (requestBody) => {
    //     try {
    //         const schema = joi.object({
    //             CountryCode: joi.string().max(10).optional(),
    //             Phone: joi.string().max(16).min(6).optional(),
    //             Email: joi.string().max(256).optional(),
    //             UserName: joi.string().max(64).optional(),
    //             Password: joi.string().max(512).required(),
    //         });
    //         return await schema.validateAsync(requestBody);
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

    // static validateLoginWithOtpRequest = async (requestBody) => {
    //     try {
    //         const schema = joi.object({
    //             CountryCode: joi.string().max(10).optional(),
    //             Phone: joi.string().max(16).min(6).optional(),
    //             Email: joi.string().max(256).optional(),
    //             UserName: joi.string().max(64).optional(),
    //             Otp: joi.string().max(10).required(),
    //         });
    //         return await schema.validateAsync(requestBody);
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

    // static validatePasswordResetRequest = async (requestBody) => {
    //     try {
    //         const schema = joi.object({
    //             Email: joi.string().max(256).optional(),
    //             UserName: joi.string().max(64).optional(),
    //         });
    //         return await schema.validateAsync(requestBody);
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

    // static validateSendOtpRequest = async (requestBody) => {
    //     try {
    //         const schema = joi.object({
    //             CountryCode: joi.string().max(10).optional(),
    //             Phone: joi.string().max(16).min(6).optional(),
    //             Email: joi.string().max(256).optional(),
    //             UserName: joi.string().max(64).optional(),
    //         });
    //         return await schema.validateAsync(requestBody);
    //     } catch (error) {
    //         ErrorHandler.handleValidationError(error);
    //     }
    // };

}
