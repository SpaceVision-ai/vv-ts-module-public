"use strict";
var TimeParser = require('./time/timeParser');
var DateParser = require('./date/dateParser');
var utils = require('./common/utils');
module.exports = class ScheduleParser {
    constructor(includeDates, excludeDates, includeTimes, excludeTimes) {
        this.includeDates = includeDates;
        this.excludeDates = excludeDates;
        this.includeTimes = includeTimes;
        this.excludeTimes = excludeTimes;
    }
    get dateRangeList() {
        const dateParser = new DateParser(this.includeDates, this.excludeDates);
        return dateParser.dateRangeList.flatMap((dateRange) => {
            const timeParser = new TimeParser(this.includeTimes, this.excludeTimes, dateRange);
            return timeParser.dateRangeList;
        });
    }
    calcAvailable(date) {
        const dateParser = new DateParser(this.includeDates, this.excludeDates);
        const timeParser = new TimeParser(this.includeTimes, this.excludeTimes);
        return dateParser.calcAvailable(date) && timeParser.calcAvailable(date);
    }
};
