var fs = require('fs')
var yaml = require('js-yaml')

var ScheduleParser = require("../lib/scheduleParser")

test('Schedul parser test', () => {
    const data = fs.readFileSync(__dirname + '/test.yaml', 'utf-8')
    const yamlObject = yaml.load(data)
        
    const rangeList = new ScheduleParser(yamlObject["schedules"], "2022-04-01", "2022-04-30").dateRangeList
    expect(rangeList.length).toBe(26)
})