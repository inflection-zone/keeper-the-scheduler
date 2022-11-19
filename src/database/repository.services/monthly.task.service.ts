import { Prisma, PrismaClient } from '@prisma/client';
import { GetNextMonthDate } from '../../domain.types/scheduler.domain.type';
import {
    ErrorHandler
} from '../../common/error.handler';
//var parser = require('cron-parser');
import parser from "cron-parser";
import { Logger } from '../../common/logger';
import { ScheduleSelectModel } from '../../domain.types/scheduler.domain.type';

/////////////////////////////////////////////////////////////////////
export class MonthlyTaskService{

    public prisma: PrismaClient=null;

    public static instance: MonthlyTaskService=null;

    private constructor(){
        this.prisma = new PrismaClient();
    }

    public static getInstance(): MonthlyTaskService{
        return this.instance || (this.instance = new this());
    }

    createMonthlyTask = async()=>{
        const schedule = await this.prisma.schedule.findMany({});
        const listOfSchedule = await this.extractSchedule(schedule);
        try {
            listOfSchedule.forEach(schedule =>{
                this.generateTasks(schedule);
            });
        } catch (error){
            Logger.instance().log('Error in generating schedule tasks: ' + error.message);
        }
        
    }
  
    extractSchedule = async(schedule)=> {
        const d = this.getNextMonthDetails();
        const listOfSchedule = [];
        schedule.forEach(s =>{
            if (s.EndDate > d.firstDayOfNextMonth){
                if (s.StartDate < d.firstDayOfNextMonth ||
                    (s.StartDate >= d.firstDayOfNextMonth && s.StartDate < d.lastDayOfNextMonth)){
                    listOfSchedule.push(s);
                }
            }
        });

        return listOfSchedule;
    }

    generateTasks =async(schedule:ScheduleSelectModel)=>{
        const d = this.getNextMonthDetails();
        const start = schedule.StartDate < d.firstDayOfNextMonth ? d.firstDayOfNextMonth : schedule.StartDate;
        const end = schedule.EndDate > d.lastDayOfNextMonth ? d.lastDayOfNextMonth : schedule.EndDate;
        Logger.instance().log('StartDate:' + start.toISOString() + ' EndDate:' + end.toISOString());
        var options = {
            currentDate : start,
            endDate     : end,
            iterator    : true,
            tz          : 'UTC'
        };
        try {
            var interval = parser.parseExpression(schedule.CronRegEx, options);
            var nextDate = null;
            do {
                try {
                    nextDate = interval.next();
                    const date = new Date(nextDate.value.toString());
                    await this.prisma.scheduleTask.create({
                        data : {
                            TriggerTime : date.toISOString(),
                            HookUri     : schedule.HookUri,
                            Retries     : 5,
                            Status      : 'PENDING',
                            Schedule    : {
                                connect : {
                                    id : schedule.id
                                }
                            }
                        }
                    });
                } catch (error) {
                    Logger.instance().log(`${schedule.CronRegEx} : From ${start.toISOString()} To ${end.toISOString()} : NO SCHEDULE`);
                    Logger.instance().log('Message :' + error.message);
                    break;
                }
            } while (nextDate.done !== true);
            
        } catch (error) {
            Logger.instance().log('Invalid Cron Expression :' + error.message);
        }
    
    }

    getNextMonthDetails = ():GetNextMonthDate=>{
        const currentDate = new Date();
        var firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        var lastDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);
        return { firstDayOfNextMonth: firstDayOfNextMonth,lastDayOfNextMonth: lastDayOfNextMonth };
    }

}
