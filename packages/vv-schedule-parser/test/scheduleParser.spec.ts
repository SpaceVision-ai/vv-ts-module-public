var fs = require('fs')
var yaml = require('js-yaml')

var { ScheduleParser } = require('../src/index');
var utils = require('../src/common/utils')

describe('schedule integration test', () => {
    // given
    const data = fs.readFileSync(__dirname + '/yaml/schedule_test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)

    test('include-dates, exclude-dates, include-times, exclude-times', () => {
        // given
        const testObject = yamlObject[0]

        // when
        const scheduleParser = new ScheduleParser(testObject["include-dates"], testObject["exclude-dates"], testObject["include-times"], testObject["exclude-times"])
        const dateRangeList = scheduleParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(16)
        expect(dateRangeList[1].to.getTime()).toBe(utils.dateWith("2022-04-04", "17:00").getTime())
        expect(dateRangeList[15].to.getTime()).toBe(utils.dateWith("2022-04-11", "17:00").getTime())
    })
})