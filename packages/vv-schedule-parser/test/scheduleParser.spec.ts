var fs = require('fs')
var yaml = require('js-yaml')

// var ScheduleParser = require("../src/scheduleParser")
var {ScheduleParser, DateParser} = require('../src/parser');


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
        
    })
})