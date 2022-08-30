"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateParser = void 0;
const utils = __importStar(require("../common/utils"));
const dateRangeNode_1 = require("../common/dateRangeNode");
const dateRangeApplier_1 = require("../common/dateRangeApplier");
const DefaultDateRange = { from: new Date(2000, 0, 1, 0, 0), to: new Date(3000, 11, 31, 24, 0) }; // 2000-01-01 ~ 3000-12-31
class DateParser {
    constructor(includes, excludes) {
        this.includes = this.convertToDateRangeList(includes);
        this.excludes = this.convertToDateRangeList(excludes);
    }
    get dateRangeList() {
        this.parseIncludes();
        this.parseExcludes();
        if (!!this.topNode) {
            return Array.from(this.topNode);
        }
        return [];
    }
    calcAvailable(date) {
        const isEmptyIncludes = this.includes.length == 0;
        const isIncluded = this.includes.some((include) => include.from <= date && include.to >= date);
        const isExcluded = this.excludes.some((exclude) => exclude.from <= date && exclude.to >= date);
        return (isEmptyIncludes || isIncluded) && !isExcluded;
    }
    parseIncludes() {
        if (this.includes.length == 0) {
            this.includes.push(DefaultDateRange);
        }
        if (!this.topNode) {
            this.topNode = new dateRangeNode_1.DateRangeNode(this.includes[0]);
        }
        this.topNode = dateRangeApplier_1.DateRangeApplier.applyIncludes(this.topNode, this.includes);
    }
    parseExcludes() {
        if (!!this.topNode) {
            this.topNode = dateRangeApplier_1.DateRangeApplier.applyExcludes(this.topNode, this.excludes);
        }
    }
    convertToDateRangeList(yaml) {
        if (!yaml) {
            return [];
        }
        return yaml.map((date) => {
            this.validDateYAML(date);
            if (date["date"]) {
                return { from: utils.dateWith(date.date, "00:00"), to: utils.dateWith(date.date, "24:00") };
            }
            else {
                return { from: utils.dateWith(date.start, "00:00"), to: utils.dateWith(date.end, "24:00") };
            }
        });
    }
    validDateYAML(yaml) {
        yaml.start = yaml.start || yaml['start-date'] || yaml.startDate;
        yaml.end = yaml.end || yaml['end-date'] || yaml.endDate;
        if (!yaml.start && !yaml.end && !yaml.date) {
            throw new Error("하나 이상의 인자값(start, end / date)을 추가해주세요.");
        }
        if (!!yaml.start && !!yaml.end && !!yaml.date) {
            throw new Error("모든 요소를 포함할 수 없습니다. start, end 혹은 date 중 선택해 주세요.");
        }
        if ((!!yaml.start && !yaml.end) || !!yaml.end && !yaml.start) {
            throw new Error("start와 end는 함께 사용되어야 합니다.");
        }
    }
}
exports.DateParser = DateParser;
