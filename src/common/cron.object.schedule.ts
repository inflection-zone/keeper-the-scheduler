import { CronObject } from "../domain.types/scheduler.domain.type";

export class CronObjectSchedule {

    monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //constructor() {}

    public createScheuleTasks = async (cronTab:CronObject) => {
        
        if (cronTab.ScheduleType === "HOURLY" || cronTab.ScheduleType === "DAILY" || cronTab.ScheduleType === "WEEKLY") {
            if (cronTab.Frequency === 1) {
                return this.createDefaultScheduleTask(cronTab);
            } else {
                return this.scheduleTask(cronTab);
            }
        }
  
        // if (cronTab.ScheduleType === "DAILY") {
        //     if (cronTab.Frequency === 1) {
        //         this.createDefaultScheduleTask(cronTab);
        //     } else {
        //         this.scheduleTask(cronTab);
        //     }
        // }
  
        if (cronTab.ScheduleType === "MONTHLY") {
            if (cronTab.Frequency === 1) {
                return this.createDefaultMonthlyScheduleTask(cronTab);
            } else {
                const scheduleTask: Date[] = [];
                let start:Date = null;
                let end: Date = null;
                const temp:Date = cronTab.EndDate;
                const s:Date = cronTab.StartDate;
                const e: Date = cronTab.EndDate;
                for (let i:Date = s; i < e;) {
                    start = i;
                    end = new Date(start.toISOString());
                    end.setUTCDate(1);
                    end.setUTCMonth(end.getUTCMonth() + 1);
                    end.setUTCHours(0);
                    end.setUTCMinutes(0);
                    end.setUTCSeconds(0);
                    end.setMilliseconds(0);
                    if (end.getTime() > temp.getTime()) {
                        end = new Date(temp.toISOString());
                    }
                    cronTab.StartDate = start;
                    cronTab.EndDate = end;
                    let result = await this.scheduleTask(cronTab);
                    result.forEach((task) => {
                        scheduleTask.push(task);
                    });
                    result = [];
                    i = end;
                }
                return scheduleTask;
            }
        }
    };
  
    public createDefaultScheduleTask = async (cronTab:CronObject) => {
        const scheduleTask = new Array<Date>();
        const startDate:Date = cronTab.StartDate;
        //console.log(startDate);
        const endDate = cronTab.EndDate;
        let nextDate = this.setNextDate(cronTab);
        while (endDate.getTime() >= nextDate.getTime()) {
            if (nextDate.getTime() >= startDate.getTime()) {
                scheduleTask.push(new Date(nextDate));
            }
            //scheduleTask.push(new Date(nextDate));
            const temp: Date = nextDate;
            if (cronTab.ScheduleType === 'HOURLY'){
                temp.setUTCHours(nextDate.getUTCHours() + 1);
            }
            
            if (cronTab.ScheduleType === 'DAILY'){
                temp.setUTCHours(nextDate.getUTCHours() + 24);
            }

            if (cronTab.ScheduleType === 'WEEKLY'){
                temp.setUTCDate(nextDate.getUTCDate() + 7);
            }
            nextDate = temp;
        }
        return scheduleTask;
    };
  
    public setNextDate = (cronTab:CronObject): Date => {
        const nextDate = new Date(cronTab.StartDate.toISOString());
        //const nextDate = new Date(cronTab.StartDate);
        if (cronTab.ScheduleType === "HOURLY") {
            if (nextDate.getUTCMinutes() > cronTab.Minutes) {
                nextDate.setUTCHours(cronTab.StartDate.getUTCHours() + 1);
            }
            nextDate.setUTCMinutes(cronTab.Minutes);
            nextDate.setUTCSeconds(0);
            nextDate.setUTCMilliseconds(0);
        }
  
        if (cronTab.ScheduleType === "DAILY") {
            nextDate.setUTCHours(cronTab.Hours);
            nextDate.setUTCMinutes(cronTab.Minutes);
            nextDate.setUTCSeconds(0);
            nextDate.setUTCMilliseconds(0);
        }

        if (cronTab.ScheduleType === "WEEKLY") {
            const weekDayNumber = nextDate.getUTCDay();
            for (let i = weekDayNumber; i > 0; i--) {
                nextDate.setUTCDate(nextDate.getUTCDate() - 1);
            }
            const DayOfWeek = cronTab.DayOfWeek;
            for (let i = 0; i < DayOfWeek; i++) {
                nextDate.setUTCDate(nextDate.getUTCDate() + 1);
            }
            nextDate.setUTCHours(cronTab.Hours);
            nextDate.setUTCMinutes(cronTab.Minutes);
            nextDate.setUTCMilliseconds(0);
        }
  
        if (cronTab.ScheduleType === "MONTHLY") {
            nextDate.setDate(cronTab.DayOfMonth);
            nextDate.setUTCHours(cronTab.Hours);
            nextDate.setUTCMinutes(cronTab.Minutes);
            nextDate.setUTCMilliseconds(0);
        }
        //console.log(nextDate);
        return nextDate;
    };
  
    public resetStartDate = (cronTab:CronObject): Date => {
        const date = new Date(cronTab.StartDate.toISOString());
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        date.setUTCMilliseconds(0);
        if (cronTab.ScheduleType === "DAILY") {
            date.setUTCHours(0);
        }
        if (cronTab.ScheduleType === "MONTHLY") {
            date.setUTCHours(0);
            date.setUTCDate(1);
        }
        return date;
    };
  
    public scheduleTask = async (cronTab:CronObject) => {
        const iterationsAfterSeconds = this.getIterationsAfterSeconds(cronTab);
        if (iterationsAfterSeconds % 2 === 0) {
            return this.createTaskEvenly(iterationsAfterSeconds, cronTab);
        } else {
            return this.createTaskUnevenly(Math.round(iterationsAfterSeconds), cronTab);
        }
    };
  
    // createMonthlyScheduleTask = (cronTab) => {
    //     const iterationsAfterSeconds = this.getIterationsAfterSeconds(cronTab);
    //     //console.log(iterationsAfterSeconds / (3600 * 24));
    //     if (iterationsAfterSeconds % 2 === 0) {
    //         this.createTaskEvenly(iterationsAfterSeconds, cronTab);
    //     } else {
    //         this.createTaskUnevenly(
    //             Math.round(iterationsAfterSeconds),
    //             cronTab
    //         );
    //     }
    // };
    // createDailylyScheduleTask = (cronTab) => {
    //     const iterationsAfterSeconds = this.getIterationsAfterSeconds(cronTab);
    //     //console.log(iterationsAfterSeconds / 3600);
    //     if (iterationsAfterSeconds % 2 === 0) {
    //         this.createDailyTaskEvenly(iterationsAfterSeconds, cronTab);
    //     } else {
    //         this.createDailyTaskUnevenly(Math.round(iterationsAfterSeconds), cronTab);
    //     }
    // };

    createTaskEvenly = async (iterationsAfterSeconds: number, cronTab:CronObject) => {
        const scheduleTask = new Array<Date>();
        const startDate = cronTab.StartDate;
        const endDate = cronTab.EndDate;
        let nextDate = this.resetStartDate(cronTab);
        while (endDate.getTime() >= nextDate.getTime()) {
            if (nextDate.getTime() > startDate.getTime()) {
                scheduleTask.push(new Date(nextDate));
            }
            const temp: Date = nextDate;
            temp.setUTCSeconds(nextDate.getUTCSeconds() + iterationsAfterSeconds);
            nextDate = temp;
        }
        //console.log(scheduleTask);
        return scheduleTask;
    };

    // createDailyTaskEvenly = (
    //     iterationsAfterSeconds: number,
    //     cronTab
    // ) => {
    //     const scheduleTask = new Array<Date>();
    //     const startDate = cronTab.StartDate;
    //     const endDate = cronTab.EndDate;
    //     let nextDate = this.resetStartDate(cronTab);
    //     while (endDate.getTime() >= nextDate.getTime()) {
    //         if (nextDate.getTime() > startDate.getTime()) {
    //             scheduleTask.push(new Date(nextDate));
    //         }
    //         const temp: Date = nextDate;
    //         temp.setUTCSeconds(nextDate.getUTCSeconds() + iterationsAfterSeconds);
    //         nextDate = temp;
    //     }
    //     //console.log(scheduleTask);
    // };
      
    getTotalSecondsPerHour = (): number => {
        return 3600;
    };
  
    getIterationsAfterSeconds = (cronTab:CronObject): number => {
        let result = 0;
        if (cronTab.ScheduleType === "HOURLY") {
            result = this.getTotalSecondsPerHour() / cronTab.Frequency;
        }
  
        if (cronTab.ScheduleType === "DAILY") {
            result = (this.getTotalSecondsPerHour() * 24) / cronTab.Frequency;
        }
  
        if (cronTab.ScheduleType === "WEEKLY") {
            result = (this.getTotalSecondsPerHour() * 24 * 7) / cronTab.Frequency;
        }

        if (cronTab.ScheduleType === "MONTHLY") {
            if (cronTab.StartDate.getUTCMonth() === 1) {
                this.monthLength[1] = this.isLeapYear(
                    cronTab.StartDate.getUTCFullYear()
                )
                    ? 29
                    : 28;
            }
            const totalDaysInMonth = this.monthLength[cronTab.StartDate.getUTCMonth()];
            result =
          (this.getTotalSecondsPerHour() * 24 * totalDaysInMonth) /
          cronTab.Frequency;
        }
  
        return result;
    };
  
    createTaskUnevenly = async (
        iterationsAfterSeconds: number,
        cronTab:CronObject
    ) => {
        let totalSeconds = 0;
        if (cronTab.ScheduleType === 'HOURLY'){
            totalSeconds = 3600;
        }
        if (cronTab.ScheduleType === 'DAILY'){
            totalSeconds = 3600 * 24;
        }

        if (cronTab.ScheduleType === 'MONTHLY'){
            if (cronTab.StartDate.getUTCMonth() === 1) {
                this.monthLength[1] = this.isLeapYear(
                    cronTab.StartDate.getUTCFullYear()
                )
                    ? 29
                    : 28;
            }
            totalSeconds =
        3600 * 24 * this.monthLength[cronTab.StartDate.getUTCMonth()];
        }
        const startDate = cronTab.StartDate;
        const endDate = cronTab.EndDate;
        const frequency = cronTab.Frequency;
        const difference =
        totalSeconds - Math.round(totalSeconds / frequency) * (frequency - 1);
        const scheduleTask = new Array<Date>();
        let nextDate = this.resetStartDate(cronTab);
        let count = 0;
        while (endDate.getTime() >= nextDate.getTime()) {
            if (nextDate.getTime() > startDate.getTime()) {
                scheduleTask.push(new Date(nextDate));
            }
            const temp: Date = new Date(nextDate);
            if (count === frequency - 1) {
                temp.setTime(temp.getTime() + difference * 1000);
                count = 0;
            } else {
                temp.setTime(
                    temp.getTime() + Math.round(iterationsAfterSeconds) * 1000
                );
            }
            count++;
            nextDate = new Date(temp);
        }
        //console.log(scheduleTask);
        return scheduleTask;
    };

    /////////////////////////////////////////////////////////////////////
    // createDefaultDailyScheduleTask = (cronTab) => {
    //     const scheduleTask = new Array<Date>();
    //     const startDate = cronTab.StartDate;
    //     //console.log(startDate);
    //     const endDate = cronTab.EndDate;
    //     let nextDate = this.setNextDate(cronTab);
    //     //console.log(nextDate);
    //     while (endDate.getTime() >= nextDate.getTime()) {
    //         if (nextDate.getTime() >= startDate.getTime()) {
    //             scheduleTask.push(new Date(nextDate));
    //         }
    //         //scheduleTask.push(new Date(nextDate));
    //         const temp: Date = nextDate;
    //         temp.setUTCHours(nextDate.getUTCHours() + 24); //only changed
    //         nextDate = temp;
    //     }
    //     //console.log(scheduleTask);
    // };
  
    //no change same like hourly
      
    //No change same like Hourly
    // createDailyTaskEvenly = (
    //     iterationsAfterSeconds: number,
    //     cronTab
    // ) => {
    //     const scheduleTask = new Array<Date>();
    //     const startDate = cronTab.StartDate;
    //     const endDate = cronTab.EndDate;
    //     let nextDate = this.resetStartDate(cronTab);
    //     while (endDate.getTime() >= nextDate.getTime()) {
    //         if (nextDate.getTime() > startDate.getTime()) {
    //             scheduleTask.push(new Date(nextDate));
    //         }
    //         const temp: Date = nextDate;
    //         temp.setUTCSeconds(nextDate.getUTCSeconds() + iterationsAfterSeconds);
    //         nextDate = temp;
    //     }
    //     //console.log(scheduleTask);
    // };
  
    // createDailyTaskUnevenly = (
    //     iterationsAfterSeconds: number,
    //     cronTab
    // ) => {
    //     const secondsPerDay = 3600 * 24; //only changed
    //     const startDate = cronTab.StartDate;
  
    //     const endDate = cronTab.EndDate;
    //     const frequency = cronTab.Frequency;
    //     const difference =
    //     secondsPerDay - Math.round(secondsPerDay / frequency) * (frequency - 1);
    //     const scheduleTask = new Array<Date>();
    //     let nextDate = this.resetStartDate(cronTab);
    //     let count = 0;
    //     while (endDate.getTime() >= nextDate.getTime()) {
    //         if (nextDate.getTime() > startDate.getTime()) {
    //             scheduleTask.push(new Date(nextDate));
    //         }
    //         const temp: Date = new Date(nextDate);
    //         if (count === frequency - 1) {
    //             temp.setTime(temp.getTime() + difference * 1000);
    //             count = 0;
    //         } else {
    //             temp.setTime(
    //                 temp.getTime() + Math.round(iterationsAfterSeconds) * 1000
    //             );
    //         }
    //         count++;
    //         nextDate = new Date(temp);
    //     }
    //     //console.log(scheduleTask);
    // };

    /////////////////MONTHLY/////////////////////
    //completely different -leap year checking remaining
    public createDefaultMonthlyScheduleTask = async (cronTab:CronObject) => {
        const scheduleTask = new Array<Date>();
        const startDate = cronTab.StartDate;
        const scheduleDate = cronTab.DayOfMonth;
        let flag = 1;
        let temp: Date = null;
        const endDate = cronTab.EndDate;
        let nextDate = this.setNextDate(cronTab);
  
        while (endDate.getTime() >= nextDate.getTime()) {
            if (nextDate.getTime() >= startDate.getTime() && flag === 1) {
                scheduleTask.push(new Date(nextDate));
            }
            temp = new Date(nextDate.toISOString());
            temp.setUTCDate(25);
            temp.setUTCMonth(temp.getUTCMonth() + 1);
            if (temp.getUTCMonth() === 1) {
                this.monthLength[1] = this.isLeapYear(temp.getUTCFullYear()) ? 29 : 28;
            }

            if (this.validateDate(temp.getUTCMonth(), scheduleDate)) {
                temp.setUTCDate(scheduleDate);
                nextDate = new Date(temp.toISOString());
                flag = 1;
            } else {
                flag = 0;
                nextDate = new Date(temp.toISOString());
            }
        }
        //console.log(scheduleTask);
        return scheduleTask;
    };
  
    validateDate = (currentMonth: number, scheduleDate: number): boolean => {
        if (scheduleDate >= 1 && scheduleDate <= this.monthLength[currentMonth]) {
            return true;
        } else {
            return false;
        }
    };

    // createMonthlyScheduleTask = (cronTab) => {
    //     const iterationsAfterSeconds = this.getIterationsAfterSeconds(cronTab);
    //     //console.log(iterationsAfterSeconds / (3600 * 24));
    //     if (iterationsAfterSeconds % 2 === 0) {
    //         this.createMonthlyTaskEvenly(iterationsAfterSeconds, cronTab);
    //     } else {
    //         this.createMonthlyTaskUnevenly(
    //             Math.round(iterationsAfterSeconds),
    //             cronTab
    //         );
    //     }
    // };
  
    //No change
    // createMonthlyTaskEvenly = (
    //     iterationsAfterSeconds: number,
    //     cronTab
    // ) => {
    //     const scheduleTask = new Array<Date>();
    //     const startDate = cronTab.StartDate;
    //     //let currentMonth = cronTab.StartDate.getUTCMonth();
    //     const endDate = cronTab.EndDate;
    //     let nextDate = this.resetStartDate(cronTab);
    //     while (endDate.getTime() >= nextDate.getTime()) {
    //         if (nextDate.getTime() > startDate.getTime()) {
    //             scheduleTask.push(new Date(nextDate));
    //         }
    //         const temp: Date = nextDate;
    //         temp.setUTCSeconds(nextDate.getUTCSeconds() + iterationsAfterSeconds);
    //         nextDate = temp;
    //     }
    //     //console.log(scheduleTask);
    // };
  
    // createMonthlyTaskUnevenly = (
    //     iterationsAfterSeconds: number,
    //     cronTab
    // ) => {
    //     const secondsPerMonth =
    //     3600 * 24 * this.monthLength[cronTab.StartDate.getUTCMonth()]; //only changed
    //     const startDate = cronTab.StartDate;
  
    //     const endDate = cronTab.EndDate;
    //     const frequency = cronTab.Frequency;
    //     const difference =
    //     secondsPerMonth -
    //     Math.round(secondsPerMonth / frequency) * (frequency - 1);
    //     const scheduleTask = new Array<Date>();
    //     let nextDate = this.resetStartDate(cronTab);
    //     let count = 0;
    //     while (endDate.getTime() >= nextDate.getTime()) {
    //         if (nextDate.getTime() > startDate.getTime()) {
    //             scheduleTask.push(new Date(nextDate));
    //         }
    //         const temp: Date = new Date(nextDate);
    //         if (count === frequency - 1) {
    //             temp.setTime(temp.getTime() + difference * 1000);
    //             count = 0;
    //         } else {
    //             temp.setTime(
    //                 temp.getTime() + Math.round(iterationsAfterSeconds) * 1000
    //             );
    //         }
    //         count++;
    //         nextDate = new Date(temp);
    //     }
    //     //console.log(scheduleTask);
    // };

    isLeapYear = (year: number): boolean => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    };

}
