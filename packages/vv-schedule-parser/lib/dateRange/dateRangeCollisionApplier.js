"use strict";
module.exports = class DateRangeCollisionApplier {
    constructor(dateRange, targetDateRange) {
        this.dateRange = dateRange;
        this.targetDateRange = targetDateRange;
    }
    insideTarget(fn) {
        this.insideTargetFN = fn;
        return this;
    }
    startInTarget(fn) {
        this.startInTargetFN = fn;
        return this;
    }
    endInTarget(fn) {
        this.endInTargetFN = fn;
        return this;
    }
    coverTarget(fn) {
        this.coverTargetFN = fn;
        return this;
    }
    stickToTargetStart(fn) {
        this.stickToTargetEndFN = fn;
        return this;
    }
    stickToTargetEnd(fn) {
        this.stickToTargetEndFN = fn;
        return this;
    }
    noCollisionAhead(fn) {
        this.noCollisionAheadFN = fn;
        return this;
    }
    noCollisionBehind(fn) {
        this.noCollisionBehindFN = fn;
        return this;
    }
    apply() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if (this.dateRange.from > this.targetDateRange.from && this.dateRange.to < this.targetDateRange.to) { // inside
            (_a = this.insideTargetFN) === null || _a === void 0 ? void 0 : _a.call(this);
        }
        else if (this.dateRange.from <= this.targetDateRange.from && this.dateRange.to >= this.targetDateRange.to) { // cover
            (_b = this.coverTargetFN) === null || _b === void 0 ? void 0 : _b.call(this);
        }
        else if (this.dateRange.from > this.targetDateRange.from && this.dateRange.from < this.targetDateRange.to) { // start in target
            (_c = this.startInTargetFN) === null || _c === void 0 ? void 0 : _c.call(this);
        }
        else if (this.dateRange.to > this.targetDateRange.from && this.dateRange.to < this.targetDateRange.to) { // end in target
            (_d = this.endInTargetFN) === null || _d === void 0 ? void 0 : _d.call(this);
        }
        else if (this.dateRange.to.getTime() == this.targetDateRange.from.getTime()) { // stick to start
            (_e = this.stickToTargetStartFN) === null || _e === void 0 ? void 0 : _e.call(this);
        }
        else if (this.dateRange.from.getTime() == this.targetDateRange.to.getTime()) { // stick to end
            (_f = this.stickToTargetEndFN) === null || _f === void 0 ? void 0 : _f.call(this);
        }
        else {
            if (this.dateRange.to < this.targetDateRange.from) {
                (_g = this.noCollisionAheadFN) === null || _g === void 0 ? void 0 : _g.call(this);
            }
            else if (this.dateRange.from > this.targetDateRange.to) {
                (_h = this.noCollisionBehindFN) === null || _h === void 0 ? void 0 : _h.call(this);
            }
            return false;
        }
        return true;
    }
};
