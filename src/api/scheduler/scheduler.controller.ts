import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { SchedulerControllerDelegate } from './scheduler.controller.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class SchedulerController extends BaseController {
    
    //#region member variables and constructors

    _delegate: SchedulerControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new SchedulerControllerDelegate();
    }

    //#endregion

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            const record = await this._delegate.create(request.body);
            const message = 'Scheduler added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // getAllFaculty= async (request: express.Request, response: express.Response): Promise<void> => {
    //     try {
    //         //await this.authorize('Participant.Create', request, response);
    //         const record = await this._delegate.getAllFaculty();
    //         const message = 'Faculty retrived successfully!';
    //         ResponseHandler.success(request, response, message, 201, record);
    //         //response.send('Finally Reached here');
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };
    getById = async (request: express.Request, response: express.Response): Promise < void > => {
        try {
            //await this.authorize('Participant.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Scheduler retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    }

    // search = async (request: express.Request, response: express.Response): Promise < void > => {
    //     try {
    //         await this.authorize('Participant.Search', request, response);
    //         const searchResults = await this._delegate.search(request.query);
    //         const message = 'Participant records retrieved successfully!';
    //         ResponseHandler.success(request, response, message, 200, searchResults);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // }

    // update = async (request: express.Request, response: express.Response): Promise < void > => {
    //     try {
    //         //await this.authorize('Participant.Update', request, response);
    //         const updatedRecord = await this._delegate.update(parseInt(request.params.id), request.body);
    //         const message = 'Faculty updated successfully!';
    //         ResponseHandler.success(request, response, message, 200, updatedRecord);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // }

    // delete = async (request: express.Request, response: express.Response): Promise < void > => {
    //     try {
    //         //await this.authorize('Participant.Delete', request, response);
    //         const result = await this._delegate.delete(parseInt(request.params.id));
    //         const message = 'Faculty deleted successfully!';
    //         ResponseHandler.success(request, response, message, 200, result);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };

}
