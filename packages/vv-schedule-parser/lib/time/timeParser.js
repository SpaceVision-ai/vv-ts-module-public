"use strict";
var Schedule = require('./schedule');
var utils = require('../common/utils');
var DateRangeNode = require('../common/dateRangeNode');
var DateRangeApplier = require('../common/dateRangeApplier');
module.exports = class TimeParser {
    constructor(includes, excludes, dateRange, startDate, endDate) {
        this.startDate = (dateRange === null || dateRange === void 0 ? void 0 : dateRange.from) || (startDate && utils.dateWith(startDate, "00:00")) || utils.dateWithHourMin(new Date, 0, 0);
        this.endDate = (dateRange === null || dateRange === void 0 ? void 0 : dateRange.to) || (endDate && utils.dateWith(endDate, "24:00")) || utils.dateWithHourMin(new Date, 24, 0);
        this.includes = this.convertYamlToSchedule(includes || [], true);
        this.excludes = this.convertYamlToSchedule(excludes || [], false);
    }
    get dateRangeList() {
        this.parse();
        if (!!this.topNode) {
            return Array.from(this.topNode);
        }
        return [];
    }
    calcAvailable(date) {
        return this.includes.concat(this.excludes)
            .filter((schedule) => schedule.calcIsIn(date))
            .reduce((acc, schedule) => schedule.isInclude);
    }
    convertYamlToSchedule(yamlObject, isInclude) {
        return yamlObject.map((yaml) => {
            return new Schedule(isInclude, this.startDate, this.endDate, yaml["start-time"], yaml["end-time"], yaml["weekdays"]);
        });
    }
    parse() {
        if (this.includes.length == 0) {
            this.topNode = new DateRangeNode(this.defaultIncludeAll);
        }
        this.includes.concat(this.excludes).forEach((schedule) => {
            const dateRangeList = schedule.toRangeList();
            if (!this.topNode) {
                this.topNode = new DateRangeNode(dateRangeList[0]);
            }
            this.topNode = DateRangeApplier.apply(schedule.isInclude, this.topNode, dateRangeList);
        });
    }
    get defaultIncludeAll() {
        return {
            from: new Date(this.startDate),
            to: new Date(this.endDate)
        };
    }
};
