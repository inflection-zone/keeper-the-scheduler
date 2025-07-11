import { CronObject } from '../domain.types/scheduler.domain.type';

export class CronObjectSchedule {

    monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    //constructor() {}

    public createScheuleTasks = async (cronTab: CronObject) => {
        if (
            cronTab.ScheduleType === 'HOURLY' ||
            cronTab.ScheduleType === 'DAILY' ||
            cronTab.ScheduleType === 'WEEKLY'
        ) {
            if (cronTab.Frequency === 1) {
                return this.createDefaultScheduleTasks(cronTab);
            } else {
                return this.scheduleTasks(cronTab);
            }
        }
        if (cronTab.ScheduleType === 'MONTHLY') {
            if (cronTab.Frequency === 1) {
                return this.createDefaultMonthlyScheduleTasks(cronTab);
            } else {
                const scheduleTask: Date[] = [];
                let start: Date = null;
                let end: Date = null;
                const temp: Date = cronTab.EndDate;
                const s: Date = cronTab.StartDate;
                const e: Date = cronTab.EndDate;
                for (let i: Date = s; i < e; ) {
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
                    let result = await this.scheduleTasks(cronTab);
                    result.forEach((task) => {
                        scheduleTask.push(task);
                    });
                    result = [];
                    i = end;
                }
                return scheduleTask;
            }
        }
    }

    public createDefaultScheduleTasks = async (cronTab: CronObject) => {
        const scheduleTask = new Array<Date>();
        const startDate: Date = cronTab.StartDate;
        const endDate = cronTab.EndDate;
        let nextDate = this.setNextDate(cronTab);
        while (endDate.getTime() >= nextDate.getTime()) {
            if (nextDate.getTime() >= startDate.getTime()) {
                scheduleTask.push(new Date(nextDate));
            }
            //scheduleTask.push(new Date(nextDate));
            const temp: Date = nextDate;
            if (cronTab.ScheduleType === 'HOURLY') {
                temp.setUTCHours(nextDate.getUTCHours() + 1);
            }
            if (cronTab.ScheduleType === 'DAILY') {
                temp.setUTCHours(nextDate.getUTCHours() + 24);
            }
            if (cronTab.ScheduleType === 'WEEKLY') {
                temp.setUTCDate(nextDate.getUTCDate() + 7);
            }
            nextDate = temp;
        }
        return scheduleTask;
    }

    public setNextDate = (cronTab: CronObject): Date => {
        const nextDate = new Date(cronTab.StartDate.toISOString());
        if (cronTab.ScheduleType === 'HOURLY') {
            if (nextDate.getUTCMinutes() > cronTab.Minutes) {
                nextDate.setUTCHours(cronTab.StartDate.getUTCHours() + 1);
            }
            nextDate.setUTCMinutes(cronTab.Minutes);
            nextDate.setUTCSeconds(0);
            nextDate.setUTCMilliseconds(0);
        }
        if (cronTab.ScheduleType === 'DAILY') {
            nextDate.setUTCHours(cronTab.Hours);
            nextDate.setUTCMinutes(cronTab.Minutes);
            nextDate.setUTCSeconds(0);
            nextDate.setUTCMilliseconds(0);
        }
        if (cronTab.ScheduleType === 'WEEKLY') {
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
        if (cronTab.ScheduleType === 'MONTHLY') {
            nextDate.setDate(cronTab.DayOfMonth);
            nextDate.setUTCHours(cronTab.Hours);
            nextDate.setUTCMinutes(cronTab.Minutes);
            nextDate.setUTCMilliseconds(0);
        }
        return nextDate;
    }

    public resetStartDate = (cronTab: CronObject): Date => {
        const date = new Date(cronTab.StartDate.toISOString());
        date.setUTCMinutes(0);
        date.setUTCSeconds(0);
        date.setUTCMilliseconds(0);
        if (cronTab.ScheduleType === 'DAILY') {
            date.setUTCHours(0);
        }
        if (cronTab.ScheduleType === 'MONTHLY') {
            date.setUTCHours(0);
            date.setUTCDate(1);
        }
        if (cronTab.ScheduleType === 'WEEKLY') {
            const weekDayNumber = date.getUTCDay();
            for (let i = weekDayNumber; i > 0; i--) {
                date.setUTCDate(date.getUTCDate() - 1);
            }
            date.setUTCHours(0);
        }
        return date;
    }

    public scheduleTasks = async (cronTab: CronObject) => {
        const iterationsAfterSeconds = this.getIterationsAfterSeconds(cronTab);
        if (iterationsAfterSeconds % 2 === 0) {
            return this.createTaskEvenly(iterationsAfterSeconds, cronTab);
        } else {
            return this.createTaskUnevenly(Math.round(iterationsAfterSeconds), cronTab);
        }
    }

    createTaskEvenly = async (iterationsAfterSeconds: number, cronTab: CronObject) => {
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
        return scheduleTask;
    }

    getTotalSecondsPerHour = (): number => {
        return 3600;
    }

    getIterationsAfterSeconds = (cronTab: CronObject): number => {
        let result = 0;
        if (cronTab.ScheduleType === 'HOURLY') {
            result = this.getTotalSecondsPerHour() / cronTab.Frequency;
        }
        if (cronTab.ScheduleType === 'DAILY') {
            result = (this.getTotalSecondsPerHour() * 24) / cronTab.Frequency;
        }
        if (cronTab.ScheduleType === 'WEEKLY') {
            result = (this.getTotalSecondsPerHour() * 24 * 7) / cronTab.Frequency;
        }
        if (cronTab.ScheduleType === 'MONTHLY') {
            if (cronTab.StartDate.getUTCMonth() === 1) {
                this.monthLength[1] = this.isLeapYear(cronTab.StartDate.getUTCFullYear()) ? 29 : 28;
            }
            const totalDaysInMonth = this.monthLength[cronTab.StartDate.getUTCMonth()];
            result = (this.getTotalSecondsPerHour() * 24 * totalDaysInMonth) / cronTab.Frequency;
        }
        return result;
    }

    createTaskUnevenly = async (iterationsAfterSeconds: number, cronTab: CronObject) => {
        let totalSeconds = 0;
        if (cronTab.ScheduleType === 'HOURLY') {
            totalSeconds = 3600;
        }
        if (cronTab.ScheduleType === 'DAILY') {
            totalSeconds = 3600 * 24;
        }
        if (cronTab.ScheduleType === 'MONTHLY') {
            if (cronTab.StartDate.getUTCMonth() === 1) {
                this.monthLength[1] = this.isLeapYear(cronTab.StartDate.getUTCFullYear()) ? 29 : 28;
            }
            totalSeconds = 3600 * 24 * this.monthLength[cronTab.StartDate.getUTCMonth()];
        }
        if (cronTab.ScheduleType === 'WEEKLY') {
            totalSeconds = 3600 * 24 * 7;
        }
        const startDate = cronTab.StartDate;
        const endDate = cronTab.EndDate;
        const frequency = cronTab.Frequency;
        const difference = totalSeconds - Math.round(totalSeconds / frequency) * (frequency - 1);
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
                temp.setTime(temp.getTime() + Math.round(iterationsAfterSeconds) * 1000);
            }
            count++;
            nextDate = new Date(temp);
        }
        return scheduleTask;
    }

    public createDefaultMonthlyScheduleTasks = async (cronTab: CronObject) => {
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
        return scheduleTask;
    }

    validateDate = (currentMonth: number, scheduleDate: number): boolean => {
        if (scheduleDate >= 1 && scheduleDate <= this.monthLength[currentMonth]) {
            return true;
        } else {
            return false;
        }
    }

    isLeapYear = (year: number): boolean => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

}
