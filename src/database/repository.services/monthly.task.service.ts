//import { Prisma, PrismaClient } from '@prisma/client';
import { CronObject, GetNextMonthDate } from '../../domain.types/scheduler.domain.type';
//var parser = require('cron-parser');
import parser from "cron-parser";
import { Logger } from '../../common/logger';
//import { ScheduleSelectModel } from '../../domain.types/scheduler.domain.type';
import { PrismaClientInit } from '../../startup/prisma.client.init';
/////////////////////////////////////////////////////////////////////
export class MonthlyTaskService{

    prisma = PrismaClientInit.instance().prisma();

    public static instance: MonthlyTaskService=null;

    private constructor(){}

    public static getInstance(): MonthlyTaskService{
        return this.instance || (this.instance = new this());
    }

    createMonthlyTask = async()=>{
        const schedule = await this.prisma.schedule.findMany({
            where : {
                DeletedAt : null
            }
        });
        const listOfSchedule = await this.extractSchedule(schedule);
        try {
            listOfSchedule.forEach(schedule =>{
                this.createScheuleTasks(schedule);
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

    // createScheuleTasks =async(schedule:CronObject)=>{
    //     // const d = this.getNextMonthDetails();
    //     // const start = schedule.StartDate < d.firstDayOfNextMonth ? d.firstDayOfNextMonth : schedule.StartDate;
    //     // const end = schedule.EndDate > d.lastDayOfNextMonth ? d.lastDayOfNextMonth : schedule.EndDate;
    //     // Logger.instance().log('StartDate:' + start.toISOString() + ' EndDate:' + end.toISOString());
    //     var options = {
    //         currentDate : schedule.StartDate,
    //         endDate     : schedule.EndDate,
    //         iterator    : true,
    //         tz          : 'UTC'
    //     };
    //     try {
    //         var interval = parser.parseExpression(schedule.CronRegEx, options);
    //         var nextDate = null;
    //         do {
    //             try {
    //                 nextDate = interval.next();
    //                 const date = new Date(nextDate.value.toString());
    //                 await this.prisma.scheduleTask.create({
    //                     data : {
    //                         TriggerTime : date.toISOString(),
    //                         HookUri     : schedule.HookUri,
    //                         Retries     : 5,
    //                         Status      : 'PENDING',
    //                         Schedule    : {
    //                             connect : {
    //                                 id : schedule.id
    //                             }
    //                         }
    //                     }
    //                 });
    //                 console.log(date.toISOString());
    //             } catch (error) {
    //                 // Logger.instance().log(`${schedule.CronRegEx} :
    //                 // From ${start.toISOString()} To ${end.toISOString()} : NO SCHEDULE`);
    //                 Logger.instance().log('Message :' + error.message);
    //                 break;
    //             }
    //         } while (nextDate.done !== true);
            
    //     } catch (error) {
    //         Logger.instance().log('Invalid Cron Expression :' + error.message);
    //     }
    
    // }

    createScheuleTasks = async(schedule:CronObject) =>{
        var options = {
            currentDate : schedule.StartDate,
            endDate     : schedule.EndDate,
            iterator    : true,
            tz          : 'UTC'
        };
        const scheduleTask = new Array<Date>();
        try {
            var interval = parser.parseExpression(schedule.CronRegEx, options);
            var nextDate = null;
            do {
                try {
                    nextDate = interval.next();
                    const date = new Date(nextDate.value.toString());
                    scheduleTask.push(date);
                    // await this.prisma.scheduleTask.create({
                    //     data : {
                    //         TriggerTime : date.toISOString(),
                    //         HookUri     : schedule.HookUri,
                    //         Retries     : 5,
                    //         Status      : 'PENDING',
                    //         Schedule    : {
                    //             connect : {
                    //                 id : schedule.id
                    //             }
                    //         }
                    //     }
                    // });
                } catch (error) {
                    // Logger.instance().log(`${schedule.CronRegEx} :
                    // From ${start.toISOString()} To ${end.toISOString()} : NO SCHEDULE`);
                    Logger.instance().log('Message :' + error.message);
                    break;
                }
            } while (nextDate.done !== true);
            
        } catch (error) {
            Logger.instance().log('Invalid Cron Expression :' + error.message);
        }
        return scheduleTask;
    }

    getNextMonthDetails = ():GetNextMonthDate=>{
        const currentDate = new Date();
        var firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        var lastDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 1);
        return { firstDayOfNextMonth: firstDayOfNextMonth,lastDayOfNextMonth: lastDayOfNextMonth };
    }

}
