declare var utils: any;
declare var DateRangeNode: any;
declare var DateRangeApplier: any;
declare type DateYAML = {
    "start"?: string;
    "end"?: string;
    "date"?: string;
};
declare type DatesYAML = Array<DateYAML>;
declare const DefaultDateRange: {
    from: Date;
    to: Date;
};
