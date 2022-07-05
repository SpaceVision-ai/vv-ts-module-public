"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleParser = void 0;
const timeParser_1 = require("./time/timeParser");
const dateParser_1 = require("./date/dateParser");
class ScheduleParser {
    constructor(includeDates, excludeDates, includeTimes, excludeTimes) {
        this.includeDates = includeDates;
        this.excludeDates = excludeDates;
        this.includeTimes = includeTimes;
        this.excludeTimes = excludeTimes;
    }
    get dateRangeList() {
        const dateParser = new dateParser_1.DateParser(this.includeDates, this.excludeDates);
        return dateParser.dateRangeList.flatMap((dateRange) => {
            const timeParser = new timeParser_1.TimeParser(this.includeTimes, this.excludeTimes, dateRange);
            return timeParser.dateRangeList;
        });
    }
    calcAvailable(date) {
        const givenDate = date.toDateString();
        const dateParser = new dateParser_1.DateParser(this.includeDates, this.excludeDates);
        const timeParser = new timeParser_1.TimeParser(this.includeTimes, this.excludeTimes, null, givenDate, givenDate);
        return dateParser.calcAvailable(date) && timeParser.calcAvailable(date);
    }
}
exports.ScheduleParser = ScheduleParser;
