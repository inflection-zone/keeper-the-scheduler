import { Month, SchedulerCreateModel, CronObject, ScheduleTaskModel } from '../../domain.types/scheduler.domain.type';
import { ScheduleTaskService } from './schedule.task.service';
import { ScheduleService } from './schedule.service';
import { MonthlyTaskService } from './monthly.task.service';
//import { ScheduleTaskModel } from '../../domain.types/scheduler.domain.type';

export class MonthlyCronExpTask{

    _scheduleService: ScheduleService=null;

    _scheduleTaskService :ScheduleTaskService=null;

    _cronSchedule: MonthlyTaskService  = null;

    constructor(){
        this._scheduleTaskService = new ScheduleTaskService();
        this._scheduleService = new ScheduleService();
        this._cronSchedule = MonthlyTaskService.getInstance();
    }

    createScheduleTaskForNextMonth = async ()=> {
        const month = this.getNextMonth();
        const records = this._scheduleService.getSchedulesForCronExp(month.Start,month.End);
        (await records).forEach(async (schedule)=>{
            schedule.StartDate = schedule.StartDate < month.Start ? month.Start : schedule.StartDate;
            schedule.EndDate = schedule.EndDate < month.End ? schedule.EndDate : month.End;
            var createModel : CronObject  = this.getCronObject(schedule);
            const scheduleDates = await this._cronSchedule.createScheuleTasks(createModel);
            var createManyModel : ScheduleTaskModel[] = this.getCreateManyModel(scheduleDates,schedule);
            if (createManyModel.length > 0){
                createManyModel.forEach(async scheduleTask=>{
                    await this._scheduleTaskService.createByUsingCronObject(scheduleTask);
                    // console.log(scheduleTask.TriggerTime.toISOString());
                });
            }
        });
    }

    getNextMonth = () : Month =>{
        const firstDateOfMonth = new Date();
        const lastDateOfMonth = new Date();
        firstDateOfMonth.setUTCMonth(firstDateOfMonth.getUTCMonth() + 1);
        firstDateOfMonth.setUTCDate(1);
        firstDateOfMonth.setUTCHours(0);
        firstDateOfMonth.setUTCMinutes(0);
        firstDateOfMonth.setUTCSeconds(0);
        firstDateOfMonth.setUTCMilliseconds(0);
        lastDateOfMonth.setUTCMonth(lastDateOfMonth.getUTCMonth() + 2);
        lastDateOfMonth.setUTCDate(1);
        lastDateOfMonth.setUTCHours(0);
        lastDateOfMonth.setUTCMinutes(0);
        lastDateOfMonth.setUTCSeconds(0);
        lastDateOfMonth.setUTCMilliseconds(0);
        return { Start: firstDateOfMonth,End: lastDateOfMonth };
    }

    getCronObject = (CronOjectModel: SchedulerCreateModel) : CronObject=>{
        return {
            id            : CronOjectModel.id,
            SchedulerName : CronOjectModel.ScheduleName,
            ScheduleType  : CronOjectModel.ScheduleType,
            Frequency     : CronOjectModel.Frequency,
            Minutes       : CronOjectModel.Minutes,
            Hours         : CronOjectModel.Hours,
            DayOfMonth    : CronOjectModel.DayOfMonth,
            Month         : CronOjectModel.Month,
            DayOfWeek     : CronOjectModel.DayOfWeek,
            StartDate     : CronOjectModel.StartDate,
            EndDate       : CronOjectModel.EndDate,
            HookUri       : CronOjectModel.HookUri,
            CronRegEx     : CronOjectModel.CronRegEx
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
    };

}
