export declare class TimeParser {
    private startDate;
    private endDate;
    private includes;
    private excludes;
    private topNode?;
    constructor(includes?: WeekdayAndTimesYAML, excludes?: WeekdayAndTimesYAML, dateRange?: {
        from: Date;
        to: Date;
    } | null, startDate?: string, endDate?: string);
    get dateRangeList(): Array<{
        from: Date;
        to: Date;
    }>;
    calcAvailable(date: Date): boolean;
    private convertYamlToSchedule;
    private parse;
    private get defaultIncludeAll();
}
