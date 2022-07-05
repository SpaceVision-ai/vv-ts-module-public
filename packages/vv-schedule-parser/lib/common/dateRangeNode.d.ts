export declare class DateRangeNode implements Iterable<{
    from: Date;
    to: Date;
}> {
    private _prev?;
    private _next?;
    dateRange: {
        from: Date;
        to: Date;
    };
    constructor(dateRange: {
        from: Date;
        to: Date;
    });
    get next(): DateRangeNode | undefined;
    set next(next: DateRangeNode | undefined);
    get prev(): DateRangeNode | undefined;
    hasNext(): boolean;
    [Symbol.iterator](): {
        next: () => {
            value: {
                from: Date;
                to: Date;
            };
            done: boolean;
        };
    };
}
