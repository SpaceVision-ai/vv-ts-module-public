var fs = require('fs')
var yaml = require('js-yaml')

// var ScheduleParser = require("../src/scheduleParser")
var { ScheduleParser, DateParser } = require('../src/parser');
var utils = require('../src/utils')


test('simple_test.yaml', () => {
    const data = fs.readFileSync(__dirname + '/yaml/simple_test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)

    const rangeList = new ScheduleParser(yamlObject["schedules"], "2022-04-01", "2022-04-30").dateRangeList
    expect(rangeList.length).toBe(26)
})

describe('start with allow schedule test', () => {
    // given
    const data = fs.readFileSync(__dirname + '/yaml/schedule_test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)

    test('allow로 시작한 schedule은 default all deny인 것으로 간주한다', () => {
        // given
        const testObject = yamlObject[0]

        // when
        const scheduleParser = new ScheduleParser(testObject["schedules"], "2022-04-01", "2022-04-30")
        const dateRangeList = scheduleParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(21)
    })

    test('deny를 통해 시간 구간이 나뉘거나 줄어든다', () => {
        // given
        const testObject = yamlObject[1]

        // when
        const scheduleParser = new ScheduleParser(testObject["schedules"], "2022-04-04", "2022-04-11")
        const dateRangeList = scheduleParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(16)
        expect(dateRangeList[1].to.getTime()).toBe(utils.dateWith("2022-04-04", "17:00").getTime())
        expect(dateRangeList[15].to.getTime()).toBe(utils.dateWith("2022-04-11", "17:00").getTime())
    })

    test('deny로 시작한 schedule은 default all allow인 것으로 간주한다', () => {
        // given
        const testObject = yamlObject[2]

        // when
        const scheduleParser = new ScheduleParser(testObject["schedules"], "2022-04-04", "2022-04-11")
        const dateRangeList = scheduleParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(16)
        expect(dateRangeList[1].to.getTime()).toBe(utils.dateWith("2022-04-04", "17:00").getTime())
        expect(dateRangeList[15].to.getTime()).toBe(utils.dateWith("2022-04-11", "17:00").getTime())
    })

    test('deny -> allow test', () => {
        // given
        const testObject = yamlObject[3]

        // when
        const scheduleParser = new ScheduleParser(testObject["schedules"], "2022-04-04", "2022-04-11")
        const dateRangeList = scheduleParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(10)
        expect(dateRangeList[0].to.getTime()).toBe(utils.dateWith("2022-04-04", "18:00").getTime())
        expect(dateRangeList[5].to.getTime()).toBe(utils.dateWith("2022-04-09", "18:00").getTime())
        expect(dateRangeList[6].to.getTime()).toBe(utils.dateWith("2022-04-09", "21:00").getTime())
        expect(dateRangeList[7].to.getTime()).toBe(utils.dateWith("2022-04-10", "18:00").getTime())
        expect(dateRangeList[8].to.getTime()).toBe(utils.dateWith("2022-04-10", "21:00").getTime())
    })
})