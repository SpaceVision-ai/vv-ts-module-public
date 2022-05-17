var utils = require('../common/utils')
var DateRangeNode = require('../common/dateRangeNode')
var DateRangeApplier = require('../common/dateRangeApplier')

const DefaultDateRange = { from: new Date(2000, 0, 1, 0, 0), to: new Date(3000, 11, 31, 24, 0)} // 2000-01-01 ~ 3000-12-31

module.exports = class DateParser {

    private topNode?: typeof DateRangeNode
    private includes: Array<{ from: Date, to: Date }>
    private excludes: Array<{ from: Date, to: Date }>

    constructor(includes: DatesYAML, excludes: DatesYAML) {
        this.includes = this.convertToDateRangeList(includes)
        this.excludes = this.convertToDateRangeList(excludes)
    }

    public get dateRangeList(): Array<{ from: Date, to: Date }> {
        this.parseIncludes()
        this.parseExcludes()
        if (!!this.topNode) {
            return Array.from(this.topNode)
        }
        return []
    }

    public calcAvailable(date: Date): boolean {
        const includesIsEmpty = this.includes.length == 0
        const isIncluded = this.includes.some((include) => include.from <= date && include.to >= date)
        const isExcluded = this.excludes.some((exclude) => exclude.from <= date && exclude.to >= date)
        return (includesIsEmpty || isIncluded) && !isExcluded
    }

    private parseIncludes() {
        if (this.includes.length == 0) {
            this.includes.push(DefaultDateRange)
        }
        if (!this.topNode) {
            this.topNode = new DateRangeNode(this.includes[0])
        }
        this.topNode = DateRangeApplier.applyIncludes(this.topNode, this.includes)
    }

    private parseExcludes() {
        this.topNode = DateRangeApplier.applyExcludes(this.topNode, this.excludes)
    }

    private convertToDateRangeList(yaml: DatesYAML): Array<{ from: Date, to: Date }> {
        if (!yaml) {
            return []
        }
        return yaml.map((date) => {
            this.validDateYAML(date)
            if (date["date"]) {
                return { from: utils.dateWith(date["date"], "00:00"), to: utils.dateWith(date["date"], "24:00") }
            } else {
                return { from: utils.dateWith(date["start"]!, "00:00"), to: utils.dateWith(date["end"]!, "24:00") }
            }
        })
    }

    private validDateYAML(yaml: DateYAML) {
        if (!yaml["start"] && !yaml["end"] && !yaml["date"]) {
            throw new Error("하나 이상의 인자값(start, end / date)을 추가해주세요.")
        }
        if (!!yaml["start"] && !!yaml["end"] && !!yaml["date"]) {
            throw new Error("모든 요소를 포함할 수 없습니다. start, end 혹은 date 중 선택해 주세요.")
        }
        if ((!!yaml["start"] && !yaml["end"]) || !!yaml["end"] && !yaml["start"]) {
            throw new Error("start와 end는 함께 사용되어야 합니다.")
        }
    }
}