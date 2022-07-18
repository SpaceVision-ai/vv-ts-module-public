export type DateYAML = {
    start?: string,
    end?: string,
    date?: string
}
export type DatesYAML = Array<DateYAML>

export type WeekdayAndTimeYAML = {
    "start-time"?: string,
    "end-time"?: string,
    startTime?: string,
    endTime?: string,
    weekdays?: [string]
}
export type WeekdayAndTimesYAML = Array<WeekdayAndTimeYAML>
