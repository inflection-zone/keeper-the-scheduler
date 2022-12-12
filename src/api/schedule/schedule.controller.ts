import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { ScheduleControllerDelegate } from './schedule.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class ScheduleController extends BaseController {
    
    //#region member variables and constructors

    _delegate: ScheduleControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new ScheduleControllerDelegate();
    }

    //#endregion

    createByUsingCronExpression = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const record = await this._delegate.createByUsingCronExpression(request.body);
            const message = 'Schedule added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    createByUsingCronObject = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const record = await this._delegate.createByUsingCronObject(request.body);
            const message = 'Schedule added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            const record = await this._delegate.getById(request.params.id);
            const message = 'Schedule retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    update = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Schedule updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    delete = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            const result = await this._delegate.delete(request.params.id);
            const message = 'Schedule deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

}
