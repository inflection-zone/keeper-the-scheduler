import * as cron from 'node-cron';
import { MonthlyCronObjectTask } from '../database/repository.services/monthly.cron.object.service';
import * as CronSchedules from '../../seed.data/cron.schedules.json';
import { Logger } from '../common/logger';
import { MonthlyTaskService } from '../database/repository.services/monthly.task.service';
///////////////////////////////////////////////////////////////////////////

export class Scheduler {

    //#region Static privates

    private static _instance: Scheduler = null;

    private static _schedules = null;

    private constructor() {
        const env = process.env.NODE_ENV || 'development';
        Scheduler._schedules = CronSchedules[env];
        Logger.instance().log('Initializing the schedular.');
    }

    //#endregion

    //#region Publics

    public static instance(): Scheduler {
        return this._instance || (this._instance = new this());
    }

    public schedule = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {

                this.scheduleCronExpTask();
                this.scheduleCronObjectTask();
                resolve(true);
            } catch (error) {
                Logger.instance().log('Error initializing the scheduler.: ' + error.message);
                reject(false);
            }
        });
    };

    //#endregion

    //#region Privates

    private scheduleCronExpTask = () => {
        cron.schedule(Scheduler._schedules['ScheduleCronExpTask'], () => {
            Logger.instance().log('Running scheduled jobs: Monthly task creation using Cron Expression');
            (async () => {
                var service = MonthlyTaskService.getInstance();
                await service.createMonthlyTask();
            })();
        });
    };
    
    private scheduleCronObjectTask = () => {
        cron.schedule(Scheduler._schedules['ScheduleCronObjectTask'], () => {
            Logger.instance().log('Running scheduled jobs: Monthly task creation using Cron Object');
            (async () => {
                var service = new MonthlyCronObjectTask();
                await service.getSchedule();
            })();
        });
    };
    //#endregion

}
