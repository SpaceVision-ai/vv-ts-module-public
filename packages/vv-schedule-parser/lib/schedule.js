"use strict";
var utils = require('./utils');
const jsDateWeekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
module.exports = class Schedule {
    constructor(inclusion, startDate, endDate, startTime, endTime, weekdays) {
        this.inclusion = inclusion;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime || "00:00";
        this.endTime = endTime || "24:00";
        this.weekdays = (weekdays && weekdays) || [];
    }
    get isAllow() {
        return this.inclusion == "allow";
    }
    calcIsIn(date) {
        const scheduleDateFrom = utils.dateWith(this.startDate, this.startTime);
        const scheduleDateTo = utils.dateWith(this.endDate, this.endTime);
        let weekdaysIndex = this.weekdays.map((weekday) => jsDateWeekdays.indexOf(weekday));
        let weekdayOfTarget = date.getDay();
        return weekdaysIndex.includes(weekdayOfTarget) && date >= scheduleDateFrom && date <= scheduleDateTo;
    }
    toRangeList() {
        if (this.weekdays.length > 0) {
            return this.weekdaysRangeList;
        }
        else {
            return this.dateRangeLists;
        }
    }
    get dateRangeLists() {
        const from = utils.dateWith(this.startDate, this.startTime);
        const to = utils.dateWith(this.endDate, this.endTime);
        return [{ from, to }];
    }
    get weekdaysRangeList() {
        const result = [];
        const endDateOfDateType = utils.dateWith(this.endDate, this.endTime);
        let targetDate = new Date(this.startDate);
        while (targetDate <= endDateOfDateType) {
            let weekdaysIndex = this.weekdays.map((weekday) => jsDateWeekdays.indexOf(weekday));
            let weekdayOfTarget = targetDate.getDay();
            if (weekdaysIndex.includes(weekdayOfTarget)) {
                const targetDateString = targetDate.toDateString();
                const from = utils.dateWith(targetDateString, this.startTime);
                const to = utils.dateWith(targetDateString, this.endTime);
                result.push({ from, to });
            }
            targetDate.setDate(targetDate.getDate() + 1);
        }
        return result;
    }
};
