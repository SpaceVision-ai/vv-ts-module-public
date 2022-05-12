declare var Schedule: any;
declare var utils: any;
declare var DateRangeNode: any;
declare var DateRangeApplier: any;
declare type ScheduleYAML = {
    "inclusion"?: string;
    "start-date"?: string;
    "end-date"?: string;
    "start-time"?: string;
    "end-time"?: string;
    "weekdays"?: [string];
};
declare type SchedulesYAML = Array<ScheduleYAML>;
