export declare class DateRangeCollisionExecutor {
    private dateRange;
    private targetDateRange;
    private insideTargetFN?;
    private startInTargetFN?;
    private endInTargetFN?;
    private coverTargetFN?;
    private stickToTargetStartFN?;
    private stickToTargetEndFN?;
    private noCollisionAheadFN?;
    private noCollisionBehindFN?;
    constructor(dateRange: {
        from: Date;
        to: Date;
    }, targetDateRange: {
        from: Date;
        to: Date;
    });
    insideTarget(fn: () => void): DateRangeCollisionExecutor;
    startInTarget(fn: () => void): DateRangeCollisionExecutor;
    endInTarget(fn: () => void): DateRangeCollisionExecutor;
    coverTarget(fn: () => void): DateRangeCollisionExecutor;
    stickToTargetStart(fn: () => void): DateRangeCollisionExecutor;
    stickToTargetEnd(fn: () => void): DateRangeCollisionExecutor;
    noCollisionAhead(fn: () => void): DateRangeCollisionExecutor;
    noCollisionBehind(fn: () => void): DateRangeCollisionExecutor;
    execute(): boolean;
}
