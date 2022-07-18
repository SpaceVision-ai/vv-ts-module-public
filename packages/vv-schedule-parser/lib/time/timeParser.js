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
exports.TimeParser = void 0;
const schedule_1 = require("./schedule");
const utils = __importStar(require("../common/utils"));
const dateRangeNode_1 = require("../common/dateRangeNode");
const dateRangeApplier_1 = require("../common/dateRangeApplier");
class TimeParser {
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
        const calcDateIsIn = (schedule) => schedule.calcIsIn(date);
        const isEmptyIncludes = this.includes.length == 0;
        const isIncluded = this.includes.some(calcDateIsIn);
        const isExcluded = this.excludes.some(calcDateIsIn);
        return (isEmptyIncludes || isIncluded) && !isExcluded;
    }
    convertYamlToSchedule(yamlObject, isInclude) {
        return yamlObject.map((yaml) => {
            return new schedule_1.Schedule(isInclude, this.startDate, this.endDate, yaml.startTime || yaml["start-time"], yaml.endTime || yaml["end-time"], yaml.weekdays);
        });
    }
    parse() {
        if (this.includes.length == 0) {
            this.topNode = new dateRangeNode_1.DateRangeNode(this.defaultIncludeAll);
        }
        this.includes.concat(this.excludes).forEach((schedule) => {
            const dateRangeList = schedule.toRangeList();
            if (!this.topNode) {
                this.topNode = new dateRangeNode_1.DateRangeNode(dateRangeList[0]);
            }
            this.topNode = dateRangeApplier_1.DateRangeApplier.apply(schedule.isInclude, this.topNode, dateRangeList);
        });
    }
    get defaultIncludeAll() {
        return {
            from: new Date(this.startDate),
            to: new Date(this.endDate)
        };
    }
}
exports.TimeParser = TimeParser;
