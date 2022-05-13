var fs = require('fs')
var yaml = require('js-yaml')

var ScheduleParser = require("../src/scheduleParser")

test('simple_test.yaml', () => {
    const data = fs.readFileSync(__dirname + '/yaml/simple_test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)
        
    const rangeList = new ScheduleParser(yamlObject["schedules"], "2022-04-01", "2022-04-30").dateRangeList
    expect(rangeList.length).toBe(26)
})

describe('allow ')