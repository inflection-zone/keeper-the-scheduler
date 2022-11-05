import { SchedulerService } from "../../database/repository.services/scheduler.service";
import {
    ErrorHandler,
} from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { ApiError } from '../../common/api.error';
import { SchedulerValidator as validator } from './scheduler.validator';
// import { Logger } from '../../common/logger';
// import { Prisma } from "@prisma/client";
import { Prisma } from '@prisma/client';
import { uuid } from '../../domain.types/miscellaneous/system.types';
///////////////////////////////////////////////////////////////////////////////////////

export class SchedulerControllerDelegate {

    //#region member variables and constructors

    _service: SchedulerService = null;

    constructor() {
        this._service = new SchedulerService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: Prisma.SchedulerCreateInput = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create Scheduler!', 400);
        }
        return this.getEnrichedDto(record);
    };

    // getAllFaculty = async () => {
    //     //await validator.validateCreateRequest(requestBody);
    //     //var createModel: StudentCreateModel = this.getCreateModel(requestBody);
    //     const record = await this._service.prisma.facultyInfo.findMany();
    //     if (record === null) {
    //         throw new ApiError('Unable to retrived Faculty information!', 400);
    //     }
    //     //return this.getEnrichedDto(record);
    //     return record;
    // };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Scheduler with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    // search = async (query: any) => {
    //     await validator.validateSearchRequest(query);
    //     var filters: ClientSearchFilters = this.getSearchFilters(query);
    //     var searchResults: ClientSearchResults = await this._service.search(filters);
    //     var items = searchResults.Items.map(x => this.getSearchDto(x));
    //     searchResults.Items = items;
    //     return searchResults;
    // }

    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record =  await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Scheduler with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: Prisma.SchedulerUpdateInput = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update Schedule!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    // delete = async (id: number) => {
    //     const record = await this._service.prisma.facultyInfo.findUnique({
    //         where : {
    //             id : id,
    //         }
    //     });
    //     if (record == null) {
    //         ErrorHandler.throwNotFoundError('Faculty with id ' + id.toString() + ' cannot be found!');
    //     }
    //     const facultyDeleted = await this._service.prisma.facultyInfo.delete({
    //         where : {
    //             id : id,
    //         }
    //     });
    //     return {
    //         Deleted : facultyDeleted
    //     };
    // }

    // ///////////////////////////////////////////////////////////////////////////////////////////////

    // //#region Privates

    // getSearchFilters = (query) => {

    //     var filters = {};

    //     var clientName = query.clientName ? query.clientName : null;
    //     if (clientName != null) {
    //         filters['ClientName'] = clientName;
    //     }
    //     var clientCode = query.clientCode ? query.clientCode : null;
    //     if (clientCode != null) {
    //         filters['ClientCode'] = clientCode;
    //     }

    //     return filters;
    // }

    getUpdateModel = (requestBody): Prisma.SchedulerUpdateInput => {

        // eslint-disable-next-line prefer-const
        let updateModel: Prisma.SchedulerUpdateInput = {};

        if (Helper.hasProperty(requestBody, 'SchedulerName')) {
            updateModel.SchedulerName = requestBody.SchedulerName;
        }
        if (Helper.hasProperty(requestBody, 'SchedulerType')) {
            updateModel.SchedulerType = requestBody.SchedulerType;
        }
        if (Helper.hasProperty(requestBody, 'Frequency')) {
            updateModel.Frequency = requestBody.Frequency;
        }
        if (Helper.hasProperty(requestBody, 'Minutes')) {
            updateModel.Minutes = requestBody.Minutes;
        }
        if (Helper.hasProperty(requestBody, 'Hours')) {
            updateModel.Hours = requestBody.Hours;
        }
        if (Helper.hasProperty(requestBody, 'DayOfMonth')) {
            updateModel.DayOfMonth = requestBody.DayOfMonth;
        }
        if (Helper.hasProperty(requestBody, 'Month')) {
            updateModel.Month = requestBody.Month;
        }
        if (Helper.hasProperty(requestBody, 'DayOfWeek')) {
            updateModel.DayOfWeek = requestBody.DayOfWeek;
        }
        if (Helper.hasProperty(requestBody, 'StartDate')) {
            updateModel.StartDate = requestBody.StartDate;
        }
        if (Helper.hasProperty(requestBody, 'EndDate')) {
            updateModel.EndDate = requestBody.EndDate;
        }
        if (Helper.hasProperty(requestBody, 'HookUri')) {
            updateModel.HookUri = requestBody.HookUri;
        }
        if (Helper.hasProperty(requestBody, 'CronRegEx')) {
            updateModel.CronRegEx = requestBody.CronRegEx;
        }
        
        return updateModel;
    }

    getCreateModel = (requestBody): Prisma.SchedulerCreateInput => {
        return {
            SchedulerName : requestBody.SchedulerName ? requestBody.SchedulerName : null,
            SchedulerType : requestBody.SchedulerType ? requestBody.SchedulerType : 'DAILY',
            Frequency     : requestBody.Frequenct ? requestBody.Frequenct : 1,
            Minutes       : requestBody.Minutes ? requestBody.Minutes : null,
            Hours         : requestBody.Hours ? requestBody.Hours : null,
            DayOfMonth    : requestBody.DayOfMonth ? requestBody.DayOfMonth : null,
            Month         : requestBody.Month ? requestBody.Month : null,
            DayOfWeek     : requestBody.DayOfWeek ? requestBody.DayOfWeek : null,
            StartDate     : requestBody.StartDate ? requestBody.StartDate : null,
            EndDate       : requestBody.EndDate ? requestBody.EndDate : null,
            HookUri       : requestBody.HookUri ? requestBody.HookUri : null,
            CronRegEx     : requestBody.CronRegEx ? requestBody.CronRegEx : null,
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            
            return null;
        }
        return {
            id            : record.id,
            SchedulerName : record.SchedulerName,
            SchedulerType : record.SchedulerType,
            Frequency     : record.Frequency,
            Minutes       : record.Minutes,
            Hours         : record.Hours,
            DayOfMonth    : record.DayOfMonth,
            Month         : record.Month,
            DayOfWeek     : record.DayOfWeek,
            StartDate     : record.StartDate,
            EndDate       : record.EndDate,
            HookUri       : record.HookUri,
            CronRegEx     : record.CronRegEx

        };
    };

    // getSearchDto = (record) => {
    //     if (record == null) {
    //         return null;
    //     }
    //     return {
    //         id: record.id,
    //         ClientName: record.ClientName,
    //         ClientCode: record.ClientCode,
    //         Phone: record.Phone,
    //         Email: record.Email
    //     };
    // }

    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
