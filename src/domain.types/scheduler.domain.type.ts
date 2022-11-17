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
