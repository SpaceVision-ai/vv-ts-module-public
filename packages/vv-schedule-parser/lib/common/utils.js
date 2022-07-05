"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultDateRangeFrom = exports.formatDateStringWith = exports.dateWithHourMin = exports.dateWith = void 0;
function dateWith(dateString, timeString) {
    return new Date(dateString + ' ' + timeString);
}
exports.dateWith = dateWith;
function dateWithHourMin(date, hour, min) {
    date.setHours(hour);
    date.setMinutes(min);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
exports.dateWithHourMin = dateWithHourMin;
function formatDateStringWith(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
}
exports.formatDateStringWith = formatDateStringWith;
function defaultDateRangeFrom(date) {
    const from = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0);
    const to = new Date(date.getFullYear() + 100, date.getMonth(), date.getDate(), 24, 0);
    return { from, to };
}
exports.defaultDateRangeFrom = defaultDateRangeFrom;
