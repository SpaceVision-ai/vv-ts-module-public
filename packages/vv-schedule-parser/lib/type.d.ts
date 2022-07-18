export declare type DateYAML = {
    start?: string;
    end?: string;
    date?: string;
};
export declare type DatesYAML = Array<DateYAML>;
export declare type WeekdayAndTimeYAML = {
    "start-time"?: string;
    "end-time"?: string;
    startTime?: string;
    endTime?: string;
    weekdays?: [string];
};
export declare type WeekdayAndTimesYAML = Array<WeekdayAndTimeYAML>;
