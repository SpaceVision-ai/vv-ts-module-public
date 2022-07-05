declare type DateYAML = {
    "start"?: string;
    "end"?: string;
    "date"?: string;
};
declare type DatesYAML = Array<DateYAML>;
declare type WeekdayAndTimeYAML = {
    "start-time"?: string;
    "end-time"?: string;
    "weekdays"?: [string];
};
declare type WeekdayAndTimesYAML = Array<WeekdayAndTimeYAML>;
