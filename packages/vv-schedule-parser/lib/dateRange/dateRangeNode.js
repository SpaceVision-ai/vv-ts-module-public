"use strict";
module.exports = class DateRangeNode {
    constructor(dateRange) {
        this.dateRange = {
            from: new Date(dateRange.from),
            to: new Date(dateRange.to)
        };
    }
    get next() {
        return this._next;
    }
    set next(next) {
        if (!!next) {
            next._prev = this;
        }
        this._next = next;
    }
    get prev() {
        return this._prev;
    }
    hasNext() {
        return !!this.next;
    }
    [Symbol.iterator]() {
        let nextItem = this;
        return {
            next: () => {
                const value = nextItem === null || nextItem === void 0 ? void 0 : nextItem.dateRange;
                const done = !nextItem;
                if (!done) {
                    nextItem = nextItem.next;
                }
                return {
                    value,
                    done
                };
            }
        };
    }
};
