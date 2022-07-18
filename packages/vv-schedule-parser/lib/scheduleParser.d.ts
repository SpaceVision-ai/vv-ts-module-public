import type { DatesYAML, WeekdayAndTimesYAML } from './type';
export declare class ScheduleParser {
    private includeDates;
    private excludeDates;
    private includeTimes;
    private excludeTimes;
    constructor(includeDates: DatesYAML, excludeDates: DatesYAML, includeTimes: WeekdayAndTimesYAML, excludeTimes: WeekdayAndTimesYAML);
    get dateRangeList(): Array<{
        from: Date;
        to: Date;
    }>;
    calcAvailable(date: Date): boolean;
}
