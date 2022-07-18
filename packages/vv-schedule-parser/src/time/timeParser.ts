import {Schedule} from './schedule'
import * as utils from '../common/utils'
import {DateRangeNode} from '../common/dateRangeNode'
import {DateRangeApplier} from '../common/dateRangeApplier'
import type {WeekdayAndTimesYAML} from '../type'


export class TimeParser {

    private startDate: Date
    private endDate: Date

    private includes: Schedule[]
    private excludes: Schedule[]
    private topNode?: DateRangeNode

    constructor(
        includes?: WeekdayAndTimesYAML, 
        excludes?: WeekdayAndTimesYAML,
        dateRange?: { from: Date, to: Date } | null,
        startDate?: string,
        endDate?: string
    ) {
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
        const calcDateIsIn = (schedule: Schedule): boolean => schedule.calcIsIn(date)
        const isEmptyIncludes = this.includes.length == 0;
        const isIncluded = this.includes.some(calcDateIsIn);
        const isExcluded = this.excludes.some(calcDateIsIn);
        return (isEmptyIncludes || isIncluded) && !isExcluded
    }

    private convertYamlToSchedule(yamlObject: WeekdayAndTimesYAML, isInclude: boolean): Schedule[] {
        return yamlObject.map((yaml: any) => {
            return new Schedule(
                isInclude,
                this.startDate,
                this.endDate,
                yaml.startTime || yaml["start-time"],
                yaml.endTime || yaml["end-time"],
                yaml.weekdays
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
