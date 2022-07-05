import { DateRangeNode } from './dateRangeNode';
export declare class DateRangeApplier {
    static apply(isInclude: boolean, topNode: DateRangeNode, dateRangeList: Array<{
        from: Date;
        to: Date;
    }>): DateRangeNode | undefined;
    static applyIncludes(topNode: DateRangeNode, dateRangeList: Array<{
        from: Date;
        to: Date;
    }>): DateRangeNode;
    static applyExcludes(topNode: DateRangeNode, dateRangeList: Array<{
        from: Date;
        to: Date;
    }>): DateRangeNode | undefined;
}
