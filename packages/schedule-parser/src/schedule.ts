var utils = require('./utils')

type Inclusion = "allow" | "deny"
type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
const jsDateWeekdays: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

module.exports = class Schedule {

    readonly inclusion: Inclusion
    private startDate: string
    private endDate: string
    private startTime: string
    private endTime: string
    private weekdays: Weekday[]

    constructor(
        inclusion: string,
        startDate: string,
        endDate: string,
        startTime?: string,
        endTime?: string,
        weekdays?: string[]) {
        this.inclusion = inclusion as Inclusion

        this.startDate = startDate
        this.endDate = endDate
        this.startTime = startTime || "00:00"
        this.endTime = endTime || "24:00"
        this.weekdays = (weekdays && weekdays as Weekday[]) || []
    }

    public get isAllow(): boolean {
        return this.inclusion == "allow"
    }

    public calcIsIn(date: Date): boolean {
        const scheduleDateFrom = utils.dateWith(this.startDate, this.startTime)
        const scheduleDateTo = utils.dateWith(this.endDate, this.endTime)
        let weekdaysIndex = this.weekdays.map((weekday: Weekday) => jsDateWeekdays.indexOf(weekday))
        let weekdayOfTarget = date.getDay()

        return weekdaysIndex.includes(weekdayOfTarget) && date >= scheduleDateFrom && date <= scheduleDateTo
    }

    toRangeList(): Array<{ from: Date, to: Date }> {
        if (this.weekdays.length > 0) {
            return this.weekdaysRangeList
        } else {
            return this.dateRangeLists
        }
    }

    private get dateRangeLists(): Array<{ from: Date, to: Date }> {
        const from = utils.dateWith(this.startDate, this.startTime)
        const to = utils.dateWith(this.endDate, this.endTime)

        return [{ from, to }]
    }

    private get weekdaysRangeList(): Array<{ from: Date, to: Date }> {
        const result: { from: Date, to: Date }[] = []
        const endDateOfDateType = utils.dateWith(this.endDate, this.endTime)
        let targetDate = new Date(this.startDate)
        while (targetDate <= endDateOfDateType) {
            let weekdaysIndex = this.weekdays.map((weekday: Weekday) => jsDateWeekdays.indexOf(weekday))
            let weekdayOfTarget = targetDate.getDay()

            if (weekdaysIndex.includes(weekdayOfTarget)) {
                const targetDateString = targetDate.toDateString()
                const from = utils.dateWith(targetDateString, this.startTime)
                const to = utils.dateWith(targetDateString, this.endTime)
                result.push({ from, to })
            }
            targetDate.setDate(targetDate.getDate() + 1)
        }

        return result
    }
}
