import * as utils from '../common/utils'

type Weekday = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
const jsDateWeekdays: Weekday[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

export class Schedule {

    readonly isInclude: boolean
    private startDate: Date
    private endDate: Date
    private startTime: string
    private endTime: string
    private weekdays: Weekday[]

    constructor(
        isInclude: boolean,
        startDate: Date,
        endDate: Date,
        startTime?: string,
        endTime?: string,
        weekdays?: string[]) {
        this.isInclude = isInclude

        this.startDate = startDate
        this.endDate = endDate
        this.startTime = startTime || "00:00"
        this.endTime = endTime || "24:00"
        this.weekdays = (weekdays && weekdays as Weekday[]) || Array.from(jsDateWeekdays)
    }

    public calcIsIn(date: Date): boolean {
        const timeFrom = Number(this.startTime.split(":")[0]) * 60 + Number(this.startTime.split(":")[1])
        const timeTo = Number(this.endTime.split(":")[0]) * 60 + Number(this.endTime.split(":")[1])
        const weekdaysIndex = this.weekdays.map((weekday: Weekday) => jsDateWeekdays.indexOf(weekday))

        const weekdayOfTarget = date.getDay()
        const time = date.getHours() * 60 + date.getMinutes()

        const isInWeek = weekdaysIndex.includes(weekdayOfTarget)
        const isInDate = this.startDate <= date && this.endDate >= date
        const isInTime = timeFrom <= time && timeTo >= time

        return isInWeek && isInDate && isInTime
    }

    toRangeList(): Array<{ from: Date, to: Date }> {
        const result: { from: Date, to: Date }[] = []

        let targetDate = new Date(this.startDate)
        while (targetDate < this.endDate) {
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
