var fs = require('fs')
var yaml = require('js-yaml')

var { TimeParser } = require('../src/index')
var utils = require('../src/common/utils')

describe('include-times and exclude-times test', () => {
    // given
    const data = fs.readFileSync(__dirname + '/yaml/time_test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)

    test('include로 시작한 schedule은 default all exclude인 것으로 간주한다', () => {
        // given
        const testObject = yamlObject[0]

        // when
        const timeParser = new TimeParser(testObject["include-times"], testObject["exclude-times"], null, "2022-04-01", "2022-04-30")
        const dateRangeList = timeParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(21)
    })

    test('exclude를 통해 시간 구간이 나뉘거나 줄어든다', () => {
        // given
        const testObject = yamlObject[1]

        // when
        const timeParser = new TimeParser(testObject["include-times"], testObject["exclude-times"], null, "2022-04-04", "2022-04-11")
        const dateRangeList = timeParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(16)
        expect(dateRangeList[1].to.getTime()).toBe(utils.dateWith("2022-04-04", "17:00").getTime())
        expect(dateRangeList[15].to.getTime()).toBe(utils.dateWith("2022-04-11", "17:00").getTime())
    })

    test('exclude만 있는 schedule은 default all include인 것으로 간주한다', () => {
        // given
        const testObject = yamlObject[2]

        // when
        const timeParser = new TimeParser(testObject["include-times"], testObject["exclude-times"], null, "2022-04-04", "2022-04-11")
        const dateRangeList = timeParser.dateRangeList

        // then
        expect(dateRangeList.length).toBe(16)
        expect(dateRangeList[1].to.getTime()).toBe(utils.dateWith("2022-04-04", "17:00").getTime())
        expect(dateRangeList[15].to.getTime()).toBe(utils.dateWith("2022-04-11", "17:00").getTime())
    })
})