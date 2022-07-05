# `schedule-parser`
## 구성
{ DateParser, TimeParser, ScheduleParser }
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

### TimeParser
include-times, exclude-times로 제공되는 시간 조건에 따라 정해진 기간 사이 동작 가능한 Date type의 구간 목록(Array<{from: Date, to: Date}>)을 반환하거나 주입받은 Date의 가능 여부를 계산한다
```
# yaml file

include-times:
  - start-time: "09:00"
    end-time: "18:00"
exclude-times:
  - start-time: "12:00"
    end-time: "13:00"
  - weekdays: ["mon"]
    start-time: "17:00"
    end-time: "20:00"
```
```
// constructor

type WeekdayAndTimeYAML = {
    "start-time"?: string,
    "end-time"?: string,
    "weekdays"?: [string]
}
type WeekdayAndTimesYAML = Array<WeekdayAndTimeYAML>

constructor(includes?: WeekdayAndTimesYAML,
            excludes?: WeekdayAndTimesYAML,
            dateRange?: { from: Date, to: Date } | null,  // Date 범위 혹은
            startDate?: string, endDate?: string)         // 시작일 종료일 string 주입
```
```
const timeParser = new TimeParser({"include-times"}, {"exclude-times"}, [{"{from:, to:}"} || {"start date"}, {"end date"}])

const dateRangeList = timeParser.dateRangeList // => [{from, to}, {from, to}, ...]

// or

timeParser.calcAvailable({"Date"}) // => (true or false)
```

### ScheduleParser
DateParser와 TimeParser를 이용하여 Date type의 구간 목록(Array<{from: Date, to: Date}>)을 반환하거나 주입받은 Date의 가능 여부를 계산한다
```
# yaml file

include-dates:
  - start: "2022-04-01"
    end: "2022-04-30"
exclude-dates:
  - date: "2022-04-01"
  - date: "2022-04-02"
  - date: "2022-04-03"
  - start: "2022-04-12"
    end: "2022-04-30"
include-times:
  - start-time: "09:00"
    end-time: "18:00"
exclude-times:
  - start-time: "12:00"
    end-time: "13:00"
  - weekdays: ["mon"]
    start-time: "17:00"
    end-time: "20:00"
```
```
// constructor

constructor(includeDates: DatesYAML, excludeDates: DatesYAML,
        includeTimes: WeekdayAndTimesYAML, excludeTimes: WeekdayAndTimesYAML)
```
```
const scheduleParser = new ScheduleParser({"include-dates"}, {"exclude-dates"}, {"include-times"}, {"exclude-times"})

const dateRangeList = scheduleParser.dateRangeList // => [{from, to}, {from, to}, ...]

// or

scheduleParser.calcAvailable({"Date"}) // => (true or false)
```


## Usage

```
const {DateParser, TimeParser, ScheduleParser} = require('schedule-parser');
```
