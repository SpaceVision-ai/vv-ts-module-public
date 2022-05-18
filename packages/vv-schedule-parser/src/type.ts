type DateYAML = {
    "start"?: string,
    "end"?: string,
    "date"?: string
}
type DatesYAML = Array<DateYAML>

type WeekdayAndTimeYAML = {
    "start-time"?: string,
    "end-time"?: string,
    "weekdays"?: [string]
}
type WeekdayAndTimesYAML = Array<WeekdayAndTimeYAML>
