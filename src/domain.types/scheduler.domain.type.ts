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

export interface ScheduleTaskModel {
    //id?: string;
    TriggerTime: Date;
    HookUri :    string;
    Retries  :   number;
    Status    :  string;
    ScheduleId :string;

}

export interface GetNextMonthDate{
    firstDayOfNextMonth: Date;
    lastDayOfNextMonth:Date;
}

export interface ScheduleSelectModel {
    id: string;
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
    CreatedAt:Date,
    UpdatedAt: Date,
    DeletedAt: Date
}

export interface CronObject {
    id: string;
    SchedulerName: string;
    ScheduleType: string;
    Frequency?: number;
    Minutes?: number;
    Hours?: number;
    DayOfMonth?: number;
    Month?: number;
    DayOfWeek?: number;
    StartDate: Date;
    EndDate: Date;
    HookUri: string;
}
