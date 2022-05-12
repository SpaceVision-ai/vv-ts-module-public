"use strict";
var utils = require('./utils');
var DateRangeNode = require('./dateRange/dateRangeNode');
var DateRangeApplier = require('./dateRangeApplier');
module.exports = class DateParser {
    constructor(includes, excludes) {
        this.includes = this.convertToDateRangeList(includes);
        this.excludes = this.convertToDateRangeList(excludes);
        this.parseIncludes();
        this.parseExcludes();
    }
    get dateRangeList() {
        if (!!this.topNode) {
            return Array.from(this.topNode);
        }
        return [];
    }
    calcAvailable(date) {
        let isAvailable = this.includes.length > 0 ? false : true;
        for (let include of this.includes) {
            if (include.from >= date && include.to <= date) {
                isAvailable = true;
                break;
            }
        }
        for (let exclude of this.excludes) {
            if (exclude.from >= date && exclude.to <= date) {
                isAvailable = false;
                break;
            }
        }
        return isAvailable;
    }
    parseIncludes() {
        if (this.includes.length == 0) {
            this.includes.push(utils.defaultDateRangeFrom(new Date()));
        }
        if (!this.topNode) {
            this.topNode = new DateRangeNode(this.includes[0]);
        }
        this.topNode = DateRangeApplier.applyAllow(this.topNode, this.includes);
    }
    parseExcludes() {
        this.topNode = DateRangeApplier.applyDeny(this.topNode, this.excludes);
    }
    convertToDateRangeList(yaml) {
        if (!yaml) {
            return [];
        }
        return yaml.map((date) => {
            this.validDateYAML(date);
            if (date["date"]) {
                return { from: utils.dateWith(date["date"], "00:00"), to: utils.dateWith(date["date"], "24:00") };
            }
            else {
                return { from: utils.dateWith(date["start"], "00:00"), to: utils.dateWith(date["end"], "24:00") };
            }
        });
    }
    validDateYAML(yaml) {
        if (!yaml["start"] && !yaml["end"] && !yaml["date"]) {
            throw new Error("하나 이상의 인자값(start, end / date)을 추가해주세요.");
        }
        if (!!yaml["start"] && !!yaml["end"] && !!yaml["date"]) {
            throw new Error("모든 요소를 포함할 수 없습니다. start, end 혹은 date 중 선택해 주세요.");
        }
        if ((!!yaml["start"] && !yaml["end"]) || !!yaml["end"] && !yaml["start"]) {
            throw new Error("start와 end는 함께 사용되어야 합니다.");
        }
    }
};
