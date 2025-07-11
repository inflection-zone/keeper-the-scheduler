import { ScheduleService } from "../../database/repository.services/schedule.service";
import { ScheduleTaskService } from "../../database/repository.services/schedule.task.service";
import {
    ErrorHandler,
} from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { CronObjectSchedule } from "../../common/cron.object.schedule";
import { ApiError } from '../../common/api.error';
import { ScheduleValidator as validator } from './schedule.validator';
// import { Logger } from '../../common/logger';
// import { Prisma } from "@prisma/client";
import { Prisma } from '@prisma/client';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import { CronObject, ScheduleTaskModel } from '../../domain.types/scheduler.domain.type';
import { MonthlyTaskService } from '../../database/repository.services/monthly.task.service';
//import { number } from "joi";
///////////////////////////////////////////////////////////////////////////////////////

export class ScheduleControllerDelegate {

    //#region member variables and constructors

    _scheduleService: ScheduleService = null;

    _scheduleTaskService: ScheduleTaskService = null;

    _cronSchedule: CronObjectSchedule = null;

    constructor() {
        this._scheduleService = new ScheduleService();
        this._cronSchedule = new CronObjectSchedule();
        this._scheduleTaskService = new ScheduleTaskService();
    }

    //#endregion
    createByUsingCronExpression = async (requestBody: any) => {
        await validator.validateCronExprCreateRequest(requestBody);
        var createModel: Prisma.ScheduleCreateInput = this.getCreateModel(requestBody);
        const record = await this._scheduleService.createByUsingCronExpression(createModel);

        const cronTab : CronObject = await this.getCronObject(record);
        if (this.isScheduleValidForCurrentMonth(cronTab)){
            //const scheduleDates = await this._cronSchedule.createScheuleTasks(cronTab);
            const scheduleDates = await MonthlyTaskService.getInstance().createScheuleTasks(cronTab);
            var createManyModel : ScheduleTaskModel[] = this.getCreateManyModel(scheduleDates,record);
            if (createManyModel.length > 0){
                createManyModel.forEach(async schedule=>{
                    await this._scheduleTaskService.createByUsingCronObject(schedule);
                });
            }
        }

        if (record === null) {
            throw new ApiError('Unable to create Schedule!', 400);
        }
        return this.getEnrichedDto(record);
    }

    createByUsingCronObject = async (requestBody: any) => {
        await validator.validateCronObjectCreateRequest(requestBody);
        var createModel: Prisma.ScheduleCreateInput = this.getCreateModel(requestBody);
        const record = await this._scheduleService.createByUsingCronObject(createModel);
        const cronTab : CronObject = await this.getCronObject(record);
        if (this.isScheduleValidForCurrentMonth(cronTab)){
            const scheduleDates = await this._cronSchedule.createScheuleTasks(cronTab);
            var createManyModel : ScheduleTaskModel[] = this.getCreateManyModel(scheduleDates,record);
            if (createManyModel.length > 0){
                createManyModel.forEach(async schedule=>{
                    await this._scheduleTaskService.createByUsingCronObject(schedule);
                });
            }
        }
        if (record === null) {
            throw new ApiError('Unable to create Schedule!', 400);
        }
        return this.getEnrichedDto(record);
    }

    isScheduleValidForCurrentMonth = (cronTab:CronObject) : boolean =>{
        const todayDate = new Date();
        const lastDateOfMonth = new Date();
        lastDateOfMonth.setUTCMonth(todayDate.getUTCMonth() + 1);
        lastDateOfMonth.setUTCDate(1);
        lastDateOfMonth.setUTCHours(0);
        lastDateOfMonth.setUTCMinutes(0);
        lastDateOfMonth.setUTCSeconds(0);
        lastDateOfMonth.setUTCMilliseconds(0);
        const scheduleStartDate = cronTab.StartDate;
        if (scheduleStartDate.getTime() >= todayDate.getTime()
        && scheduleStartDate.getTime() < lastDateOfMonth.getTime()){
            if (cronTab.EndDate.getTime() >= lastDateOfMonth.getTime()){
                cronTab.EndDate = lastDateOfMonth;
                return true;
            }
        }
        return false;
    }
    
    getById = async (id: uuid) => {
        const record = await this._scheduleService.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Schedule with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    }

    getCronObject = async (record):Promise<CronObject> => {
        const cronObject:CronObject = {
            id            : record.id,
            SchedulerName : record.SchedulerName,
            ScheduleType  : record.ScheduleType,
            Frequency     : record.Frequency,
            Minutes       : record.Minutes,
            Hours         : record.Hours,
            DayOfMonth    : record.DayOfMonth,
            Month         : record.Month,
            DayOfWeek     : record.DayOfWeek,
            StartDate     : new Date(record.StartDate),
            EndDate       : new Date(record.EndDate),
            HookUri       : record.HookUri,
            CronRegEx     : record.CronRegEx,
        };
        return cronObject;
    }
    
    update = async (id: uuid, requestBody: any) => {
        await validator.validateUpdateRequest(requestBody);
        const record =  await this._scheduleService.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Schedule with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: Prisma.ScheduleUpdateInput = this.getUpdateModel(requestBody);
        const updated = await this._scheduleService.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update Schedule!', 400);
        }
        return this.getEnrichedDto(updated);
    }

    delete = async (id: uuid) => {
        const record = await this._scheduleService.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Schedule with id ' + id.toString() + ' cannot be found!');
        }
        const deletedSchedule = await this._scheduleService.delete(id);
        return {
            Deleted : deletedSchedule
        };
    }

    getUpdateModel = (requestBody): Prisma.ScheduleUpdateInput => {

        // eslint-disable-next-line prefer-const
        let updateModel: Prisma.ScheduleUpdateInput = {};

        if (Helper.hasProperty(requestBody, 'ScheduleName')) {
            updateModel.ScheduleName = requestBody.ScheduleName;
        }
        if (Helper.hasProperty(requestBody, 'ScheduleType')) {
            updateModel.ScheduleType = requestBody.ScheduleType;
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
        if (Helper.hasProperty(requestBody, 'CreatedAt')) {
            updateModel.CreatedAt = requestBody.CreatedAt;
        }
        if (Helper.hasProperty(requestBody, 'UpdatedAt')) {
            updateModel.UpdatedAt = requestBody.UpdatedAt;
        }
        if (Helper.hasProperty(requestBody, 'DeletedAt')) {
            updateModel.DeletedAt = requestBody.DeletedAt;
        }
        
        return updateModel;
    }

    getCreateModel = (requestBody): Prisma.ScheduleCreateInput => {
        return {
            ScheduleName : requestBody.ScheduleName ? requestBody.ScheduleName : null,
            ScheduleType : requestBody.ScheduleType ? requestBody.ScheduleType : null,
            Frequency    : requestBody.Frequency ? requestBody.Frequency : null,
            Minutes      : requestBody.Minutes ? requestBody.Minutes : null,
            Hours        : requestBody.Hours ? requestBody.Hours : null,
            DayOfMonth   : requestBody.DayOfMonth ? requestBody.DayOfMonth : null,
            Month        : requestBody.Month ? requestBody.Month : null,
            DayOfWeek    : requestBody.DayOfWeek ? requestBody.DayOfWeek : null,
            StartDate    : requestBody.StartDate ? requestBody.StartDate : null,
            EndDate      : requestBody.EndDate ? requestBody.EndDate : null,
            HookUri      : requestBody.HookUri ? requestBody.HookUri : null,
            CronRegEx    : requestBody.CronRegEx ? requestBody.CronRegEx : null,
            DeletedAt    : requestBody.DeletedAt ? requestBody.DeletedAt : null,
        };
    }

    getCreateManyModel=(scheduleDates:Date[],record):ScheduleTaskModel[]=>{
        const createManymodel :ScheduleTaskModel[] = [];
        for (const date of scheduleDates) {
            const model = <ScheduleTaskModel>{ };
            model.TriggerTime = new Date(date.toISOString()),
            model.HookUri = record.HookUri,
            model.Retries = 5,
            model.Status = 'PENDING';
            model.ScheduleId = record.id;
            createManymodel.push(model);
        }
        return createManymodel;
    }

    getEnrichedDto = (record) => {
        if (record == null) {
            
            return null;
        }
        return {
            id           : record.id,
            ScheduleName : record.ScheduleName,
            ScheduleType : record.ScheduleType,
            Frequency    : record.Frequency,
            Minutes      : record.Minutes,
            Hours        : record.Hours,
            DayOfMonth   : record.DayOfMonth,
            Month        : record.Month,
            DayOfWeek    : record.DayOfWeek,
            StartDate    : record.StartDate,
            EndDate      : record.EndDate,
            HookUri      : record.HookUri,
            CronRegEx    : record.CronRegEx,
            CreatedAt    : record.CreatedAt,
            UpdatedAt    : record.UpdatedAt,
            DeletedAt    : record.DeletedAt

        };
    }
    //#endregion

}
///////////////////////////////////////////////////////////////////////////////////////////////
