var fs = require('fs')
var yaml = require('js-yaml')

var DateParser = require('../lib/dateParser')


describe('read simple test.yaml', () => {
    const data = fs.readFileSync(__dirname + '/test.yaml', 'utf-8')
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
