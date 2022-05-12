"use strict";
var Schedule = require('./schedule');
var utils = require('./utils');
var DateRangeNode = require('./dateRange/dateRangeNode');
var DateRangeApplier = require('./dateRangeApplier');
module.exports = class ScheduleParser {
    constructor(yamlObject, startDate, endDate) {
        this.startDate = startDate || utils.formatDateStringWith(new Date());
        this.endDate = endDate || utils.formatDateStringWith(new Date());
        this.schedules = this.convertYamlToSchedule(yamlObject);
        if (this.schedules.length == 0) {
            this.topNode = new DateRangeNode(this.defaultAllowAll);
        }
        else {
            this.parseSchedules();
        }
    }
    get dateRangeList() {
        if (!!this.topNode) {
            return Array.from(this.topNode);
        }
        return [];
    }
    calcAvailable(date) {
        return this.schedules
            .filter((schedule) => schedule.calcIsIn(date))
            .reduce((acc, schedule) => schedule.isAllow);
    }
    get isStartWithDeny() {
        return this.schedules[0].inclusion == "deny";
    }
    get defaultAllowAll() {
        return {
            from: new Date(utils.dateWith(this.startDate, "00:00")),
            to: new Date(utils.dateWith(this.endDate, "24:00"))
        };
    }
    convertYamlToSchedule(yamlObject) {
        return yamlObject.map((schedule) => {
            let startDate = schedule["start-date"] || this.startDate;
            let endDate = schedule["end-date"] || this.endDate;
            return new Schedule(schedule["inclusion"] || "allow", startDate < this.startDate ? this.startDate : startDate, endDate > this.endDate ? this.endDate : endDate, schedule["start-time"], schedule["end-time"], schedule["weekdays"]);
        });
    }
    parseSchedules() {
        if (this.isStartWithDeny) {
            this.topNode = new DateRangeNode(this.defaultAllowAll);
        }
        this.schedules.forEach((schedule) => {
            const dateRangeList = schedule.toRangeList();
            if (!this.topNode) {
                this.topNode = new DateRangeNode(dateRangeList[0]);
            }
            this.topNode = DateRangeApplier.apply(schedule.isAllow, this.topNode, dateRangeList);
        });
    }
};
