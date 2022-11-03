export interface SchedulerCreateModel {
    id?: string;
    SchedulerName: string;
    Frequency?: number;
    Minutes?: number;
    Hours?: number;
    DayOfMonth?: number;
    Month?: number;
    DayOfWeek?: number;
    StartDate: Date;
    EndDate: Date;
    HookUri: string;
    CronRegEx?: string;
}

export interface StudentUpdateModel {
    firstName?: string;
    lastName?: string;
    branchName?: string;
}
