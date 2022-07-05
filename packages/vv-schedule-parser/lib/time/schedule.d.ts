export declare class Schedule {
    readonly isInclude: boolean;
    private startDate;
    private endDate;
    private startTime;
    private endTime;
    private weekdays;
    constructor(isInclude: boolean, startDate: Date, endDate: Date, startTime?: string, endTime?: string, weekdays?: string[]);
    calcIsIn(date: Date): boolean;
    toRangeList(): Array<{
        from: Date;
        to: Date;
    }>;
}
