# `schedule-parser`
## 구성
{ DateParser, ScheduleParser}
### DateParser
include-dates 와 exclude-dates로 구성된 날짜 정보에 따라 동작 가능한 Date type의 구간 목록(Array<{from: Date, to: Date}>)을 반환하거나 주입받은 Date의 가능 여부를 계산한다
```
# yaml file

include-dates:
  - start: "2022-05-01"
    end: "2022-05-31"
  - date: "2022-07-05"
  - date: "2022-07-12"
exclude-dates:
  - start: "2022-04-25"
    end: "2022-05-10"
  - date: "2022-05-31"
  - date: "2022-06-23"
  - start: "2022-07-10"
    end: "2022-07-16"
```
```
// constructor

type DateYAML = {
    "start"?: string,
    "end"?: string,
    "date"?: string
}
type DatesYAML = Array<DateYAML>

constructor(includes: DatesYAML, excludes: DatesYAML)
```
```
const dateParser = new DateParser({"include-dates"}, {"exclude-dates"})

const dateRangeList = dateParser.dateRangeList // => [{from, to}, {from, to}, ...]

// or

dateParser.calcAvailable({"Date"}) // => (true or false)
```

### ScheduleParser
allow, deny로 제공되는 시간 조건에 따라 동작 가능한 Date type의 구간 목록(Array<{from: Date, to: Date}>)을 반환하거나 주입받은 Date의 가능 여부를 계산한다
```
# yaml file

schedules:
  - inclusion: "allow"
    weekdays: ["mon", "tue", "wed", "thu", "fri"]
    start-time: "09:00"
    end-time: "18:00"
  - inclusion: "deny"
    weekdays: ["sat"]
    start-time: "14:00"
    end-time: "22:00"
  - inclusion: "deny"
    start-date: "2022-04-01"
    end-date: "2022-04-15"
    weekdays: ["sat", "sun"]
  - inclusion: "allow"
    weekdays: ["sat"]
    start-time: "14:00"
    end-time: "24:00"
```
```
// constructor

type ScheduleYAML = {
    "inclusion"?: string,
    "start-date"?: string,
    "end-date"?: string,
    "start-time"?: string,
    "end-time"?: string,
    "weekdays"?: [string]
}
type SchedulesYAML = Array<ScheduleYAML>

constructor(yamlObject: SchedulesYAML, startDate?: string, endDate?: string)
```
```
const scheduleParser = new ScheduleParser({"schedules"}, {"start date"}, {"end date"})

const dateRangeList = scheduleParser.dateRangeList // => [{from, to}, {from, to}, ...]

// or

scheduleParser.calcAvailable({"Date"}) // => (true or false)
```
## Usage

```
const {ScheduleParser, DateParser} = require('schedule-parser');
```
