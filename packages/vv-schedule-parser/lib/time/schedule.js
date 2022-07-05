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
exports.Schedule = void 0;
const utils = __importStar(require("../common/utils"));
const jsDateWeekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
class Schedule {
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
}
exports.Schedule = Schedule;
