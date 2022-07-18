import type { DatesYAML } from '../type';
export declare class DateParser {
    private topNode?;
    private includes;
    private excludes;
    constructor(includes: DatesYAML, excludes: DatesYAML);
    get dateRangeList(): Array<{
        from: Date;
        to: Date;
    }>;
    calcAvailable(date: Date): boolean;
    private parseIncludes;
    private parseExcludes;
    private convertToDateRangeList;
    private validDateYAML;
}
