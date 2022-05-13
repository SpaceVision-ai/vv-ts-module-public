var Schedule = require('./schedule')
var utils = require('./utils')
var DateRangeNode = require('./dateRange/dateRangeNode')
var DateRangeApplier = require('./dateRangeApplier')

type ScheduleYAML = {
    "inclusion"?: string,
    "start-date"?: string,
    "end-date"?: string,
    "start-time"?: string,
    "end-time"?: string,
    "weekdays"?: [string]
}
type SchedulesYAML = Array<ScheduleYAML>

module.exports = class ScheduleParser {

    private startDate: string
    private endDate: string

    private schedules: Array<typeof Schedule>
    private topNode?: typeof DateRangeNode

    constructor(yamlObject: SchedulesYAML, startDate?: string, endDate?: string) {
        this.startDate = startDate || utils.formatDateStringWith(new Date())
        this.endDate = endDate || utils.formatDateStringWith(new Date())
        this.schedules = this.convertYamlToSchedule(yamlObject)
    }

    public get dateRangeList(): Array<{ from: Date, to: Date }> {
        this.parseSchedules()
        if (!!this.topNode) {
            return Array.from(this.topNode)
        }
        return []
    }

    public calcAvailable(date: Date): boolean {
        return this.schedules
            .filter((schedule) => schedule.calcIsIn(date))
            .reduce((acc, schedule) => schedule.isAllow)
    }

    private get isStartWithDeny(): boolean {
        return this.schedules[0].inclusion == "deny"
    }

    private get defaultAllowAll(): { from: Date, to: Date } {
        return {
            from: new Date(utils.dateWith(this.startDate, "00:00")),
            to: new Date(utils.dateWith(this.endDate, "24:00"))
        }
    }

    private convertYamlToSchedule(yamlObject: SchedulesYAML): Array<typeof Schedule> {
        return yamlObject.map((schedule: any) => {
            let startDate = schedule["start-date"] || this.startDate
            let endDate = schedule["end-date"] || this.endDate
            return new Schedule(
                schedule["inclusion"] || "allow",
                startDate < this.startDate ? this.startDate : startDate,
                endDate > this.endDate ? this.endDate : endDate,
                schedule["start-time"],
                schedule["end-time"],
                schedule["weekdays"]
            )
        })
    }

    private parseSchedules() {
        if (this.schedules.length == 0) {
            this.topNode = new DateRangeNode(this.defaultAllowAll)
            return
        }
        if (this.isStartWithDeny) {
            this.topNode = new DateRangeNode(this.defaultAllowAll)
        }

        this.schedules.forEach((schedule) => {
            const dateRangeList = schedule.toRangeList()
            if (!this.topNode) {
                this.topNode = new DateRangeNode(dateRangeList[0])
            }

            this.topNode = DateRangeApplier.apply(schedule.isAllow, this.topNode, dateRangeList)
        })
    }
}
