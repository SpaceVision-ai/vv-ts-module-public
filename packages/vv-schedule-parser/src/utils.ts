module.exports = {

    dateWith: (dateString: string, timeString: string): Date => {
        return new Date(dateString + ' ' + timeString)
    },

    formatDateStringWith: (date: Date): string => {
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${date.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
    },

    defaultDateRangeFrom: (date: Date): { from: Date, to: Date } => {
        const from = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0)
        const to = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate(), 24, 0)
        return { from, to }
    }
}