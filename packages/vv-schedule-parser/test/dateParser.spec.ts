var fs = require('fs')
var yaml = require('js-yaml')

var { DateParser } = require('../src/index')
var utils = require('../src/common/utils')


describe('simple_test.yaml', () => {
    const data = fs.readFileSync(__dirname + '/yaml/simple_test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)

    test('Date parser test', () => {
        const dateRangeList = new DateParser(yamlObject["include-dates"], yamlObject["exclude-dates"]).dateRangeList
        expect(dateRangeList.length).toBe(6)
    })

    test('Date parser calculator test', () => {
        const parser = new DateParser(yamlObject["include-dates"], yamlObject["exclude-dates"])
        const available = parser.calcAvailable(new Date('2022-08-02'))
        expect(available).toBe(false)
    })
})

describe('include dates test', () => {
    // given
    const data = fs.readFileSync(__dirname + '/yaml/date_test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)

    test('겹치지 않는 include 정보들은 date range 목록을 반환한다', () => {
        // given
        const testObject = yamlObject[0]

        // when
        const dateParser = new DateParser(testObject["include-dates"], testObject["exclude-dates"])
        const dateRangeList = dateParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(4)
        expect(dateRangeList).toMatchObject([
            { from: utils.dateWith("2022-05-01", "00:00"), to: utils.dateWith("2022-05-31", "24:00") },
            { from: utils.dateWith("2022-06-03", "00:00"), to: utils.dateWith("2022-06-03", "24:00") },
            { from: utils.dateWith("2022-06-12", "00:00"), to: utils.dateWith("2022-06-12", "24:00") },
            { from: utils.dateWith("2022-06-20", "00:00"), to: utils.dateWith("2022-06-30", "24:00") }
        ])
        expect(dateParser.calcAvailable(utils.dateWith("2022-05-02", "12:00"))).toBe(true)
        expect(dateParser.calcAvailable(utils.dateWith("2022-06-03", "12:00"))).toBe(true)
        expect(dateParser.calcAvailable(utils.dateWith("2022-06-04", "12:00"))).toBe(false)
        expect(dateParser.calcAvailable(utils.dateWith("2022-07-02", "12:00"))).toBe(false)
    })

    test('연달은 include는 하나의 이어진 date range를 반환한다', () => {
        // given
        const testObject = yamlObject[1]

        // when
        const dateParser = new DateParser(testObject["include-dates"], testObject["exclude-dates"])
        const dateRangeList = dateParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(1)
        expect(dateRangeList).toMatchObject([
            { from: utils.dateWith("2022-07-20", "00:00"), to: utils.dateWith("2022-08-20", "24:00") }
        ])
        expect(dateParser.calcAvailable(utils.dateWith("2022-08-02", "12:00"))).toBe(true)
        expect(dateParser.calcAvailable(utils.dateWith("2022-06-02", "12:00"))).toBe(false)
    })

    test('겹치는 include를 하나로 통합하여 반환한다', () => {
        // given
        const testObject = yamlObject[2]

        // when
        const dateParser = new DateParser(testObject["include-dates"], testObject["exclude-dates"])
        const dateRangeList = dateParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(1)
        expect(dateRangeList).toMatchObject([
            { from: utils.dateWith("2022-09-01", "00:00"), to: utils.dateWith("2022-09-15", "24:00") }
        ])
        expect(dateParser.calcAvailable(utils.dateWith("2022-09-12", "12:00"))).toBe(true)
        expect(dateParser.calcAvailable(utils.dateWith("2022-06-02", "12:00"))).toBe(false)
    })
})

describe('exclude dates test', () => {
    // given
    const data = fs.readFileSync(__dirname + '/yaml/date_test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)

    test('exclude 구간을 제외하여 기존 include 구간이 나누어진다', () => {
        // given
        const testObject = yamlObject[3]

        // when
        const dateParser = new DateParser(testObject["include-dates"], testObject["exclude-dates"])
        const dateRangeList = dateParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(3)
        expect(dateRangeList).toMatchObject([
            { from: utils.dateWith("2000-01-01", "00:00"), to: utils.dateWith("2022-05-02", "24:00") },
            { from: utils.dateWith("2022-05-14", "00:00"), to: utils.dateWith("2022-06-24", "24:00") },
            { from: utils.dateWith("2022-06-26", "00:00"), to: utils.dateWith("3000-12-31", "24:00") }
        ])
        expect(dateParser.calcAvailable(utils.dateWith("2022-08-31", "12:00"))).toBe(true)
        expect(dateParser.calcAvailable(utils.dateWith("2022-05-10", "12:00"))).toBe(false)
    })
})

describe('include & exclude dates test', () => {
    // given
    const data = fs.readFileSync(__dirname + '/yaml/date_test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)

    test('exclude로 겹치는 구간만큼 include 구간이 줄어든다', () => {
        // given
        const testObject = yamlObject[4]

        // when
        const dateParser = new DateParser(testObject["include-dates"], testObject["exclude-dates"])
        const dateRangeList = dateParser.dateRangeList

        // then
        expect(dateRangeList).toMatchObject([
            { from: utils.dateWith("2022-05-11", "00:00"), to: utils.dateWith("2022-05-30", "24:00") }
        ])
        expect(dateParser.calcAvailable(utils.dateWith("2022-05-15", "12:00"))).toBe(true)
        expect(dateParser.calcAvailable(utils.dateWith("2022-05-31", "12:00"))).toBe(false)
    })

    test('#복잡하게 얽힌 구간 test', () => {
        // given
        const testObject = yamlObject[5]

        // when
        const dateParser = new DateParser(testObject["include-dates"], testObject["exclude-dates"])
        const dateRangeList = dateParser.dateRangeList

        // then
        expect(dateRangeList).toMatchObject([
            { from: utils.dateWith("2022-05-11", "00:00"), to: utils.dateWith("2022-05-30", "24:00") },
            { from: utils.dateWith("2022-06-10", "00:00"), to: utils.dateWith("2022-06-14", "24:00") },
            { from: utils.dateWith("2022-06-18", "00:00"), to: utils.dateWith("2022-06-22", "24:00") },
            { from: utils.dateWith("2022-06-24", "00:00"), to: utils.dateWith("2022-06-30", "24:00") },
            { from: utils.dateWith("2022-07-05", "00:00"), to: utils.dateWith("2022-07-05", "24:00") },
            { from: utils.dateWith("2022-07-19", "00:00"), to: utils.dateWith("2022-07-19", "24:00") }
        ])
    })
})