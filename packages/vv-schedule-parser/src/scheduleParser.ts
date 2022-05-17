var TimeParser = require('./time/timeParser')
var DateParser = require('./date/dateParser')
var utils = require('./common/utils')

module.exports = class ScheduleParser {

    private includeDates: DatesYAML
    private excludeDates: DatesYAML
    private includeTimes: WeekdayAndTimesYAML
    private excludeTimes: WeekdayAndTimesYAML

    constructor(includeDates: DatesYAML, excludeDates: DatesYAML,
        includeTimes: WeekdayAndTimesYAML, excludeTimes: WeekdayAndTimesYAML) {
        this.includeDates = includeDates
        this.excludeDates = excludeDates
        this.includeTimes = includeTimes
        this.excludeTimes = excludeTimes
    }

    public get dateRangeList(): Array<{ from: Date, to: Date }> {
        const dateParser = new DateParser(this.includeDates, this.excludeDates)
        return dateParser.dateRangeList.flatMap((dateRange: { from: Date, to: Date }) => {
            const timeParser = new TimeParser(this.includeTimes, this.excludeTimes, dateRange)
            return timeParser.dateRangeList
        })
    }

    public calcAvailable(date: Date): boolean {
        const givenDate = date.toDateString()
        const dateParser = new DateParser(this.includeDates, this.excludeDates)
        const timeParser = new TimeParser(this.includeTimes, this.excludeTimes, null, givenDate, givenDate)
        return dateParser.calcAvailable(date) && timeParser.calcAvailable(date)
    }
}