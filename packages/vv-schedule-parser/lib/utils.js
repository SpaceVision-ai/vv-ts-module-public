"use strict";
module.exports = {
    dateWith: (dateString, timeString) => {
        return new Date(dateString + ' ' + timeString);
    },
    formatDateStringWith: (date) => {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    },
    defaultDateRangeFrom: (date) => {
        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0);
        const to = new Date(date.getFullYear() + 100, date.getMonth(), date.getDate(), 24, 0);
        return { from, to };
    }
};
