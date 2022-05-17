var Schedule = require('./schedule')
var utils = require('../common/utils')
var DateRangeNode = require('../common/dateRangeNode')
var DateRangeApplier = require('../common/dateRangeApplier')


module.exports = class TimeParser {

    private startDate: Date
    private endDate: Date

    private includes: Array<typeof Schedule>
    private excludes: Array<typeof Schedule>
    private topNode?: typeof DateRangeNode

    constructor(includes?: WeekdayAndTimesYAML, excludes?: WeekdayAndTimesYAML,
        dateRange?: { from: Date, to: Date },
        startDate?: string, endDate?: string) {
        this.startDate = dateRange?.from || (startDate && utils.dateWith(startDate, "00:00")) || utils.dateWithHourMin(new Date, 0, 0)
        this.endDate = dateRange?.to || (endDate && utils.dateWith(endDate, "24:00")) || utils.dateWithHourMin(new Date, 24, 0)
        this.includes = this.convertYamlToSchedule(includes || [], true)
        this.excludes = this.convertYamlToSchedule(excludes || [], false)
    }

    public get dateRangeList(): Array<{ from: Date, to: Date }> {
        this.parse()
        if (!!this.topNode) {
            return Array.from(this.topNode)
        }
        return []
    }

    public calcAvailable(date: Date): boolean {
        const calcDateIsIn = (schedule: typeof Schedule) => schedule.calcIsIn(date)
        return this.includes.some(calcDateIsIn) && !this.excludes.some(calcDateIsIn)
    }

    private convertYamlToSchedule(yamlObject: WeekdayAndTimesYAML, isInclude: boolean): Array<typeof Schedule> {
        return yamlObject.map((yaml: any) => {
            return new Schedule(
                isInclude,
                this.startDate,
                this.endDate,
                yaml["start-time"],
                yaml["end-time"],
                yaml["weekdays"]
            )
        })
    }

    private parse() {
        if (this.includes.length == 0) {
            this.topNode = new DateRangeNode(this.defaultIncludeAll)
        }
        this.includes.concat(this.excludes).forEach((schedule) => {
            const dateRangeList = schedule.toRangeList()
            if (!this.topNode) {
                this.topNode = new DateRangeNode(dateRangeList[0])
            }
            this.topNode = DateRangeApplier.apply(schedule.isInclude, this.topNode, dateRangeList)
        })
    }

    private get defaultIncludeAll(): { from: Date, to: Date } {
        return {
            from: new Date(this.startDate),
            to: new Date(this.endDate)
        }
    }
}
