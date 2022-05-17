"use strict";
var utils = require('../common/utils');
const jsDateWeekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
module.exports = class Schedule {
    constructor(isInclude, startDate, endDate, startTime, endTime, weekdays) {
        this.isInclude = isInclude;
        this.startDate = startDate;
        this.endDate = endDate;
        this.startTime = startTime || "00:00";
        this.endTime = endTime || "24:00";
        this.weekdays = (weekdays && weekdays) || Array.from(jsDateWeekdays);
    }
    calcIsIn(date) {
        const timeFrom = Number(this.startTime.split(":")[0]) * 60 + Number(this.startTime.split(":")[1]);
        const timeTo = Number(this.endTime.split(":")[0]) * 60 + Number(this.endTime.split(":")[1]);
        const weekdaysIndex = this.weekdays.map((weekday) => jsDateWeekdays.indexOf(weekday));
        const weekdayOfTarget = date.getDay();
        const time = date.getHours() * 60 + date.getMinutes();
        const isInWeek = weekdaysIndex.includes(weekdayOfTarget);
        const isInDate = this.startDate <= date && this.endDate >= date;
        const isInTime = timeFrom <= time && timeTo >= time;
        return isInWeek && isInDate && isInTime;
    }
    toRangeList() {
        const result = [];
        let targetDate = new Date(this.startDate);
        while (targetDate < this.endDate) {
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
