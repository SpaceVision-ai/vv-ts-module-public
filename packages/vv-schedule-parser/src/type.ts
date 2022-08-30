export type DateYAML = {
    "start-date"?: string,
    "end-date"?: string,
    startDate?: string,
    endDate?: string,
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
    start?: string,
    end?: string,
    weekdays?: [string]
}
export type WeekdayAndTimesYAML = Array<WeekdayAndTimeYAML>
