module.exports = class DateRangeNode implements Iterable<{ from: Date, to: Date }> {

    private _prev?: DateRangeNode
    private _next?: DateRangeNode
    dateRange: { from: Date, to: Date }

    constructor(dateRange: { from: Date, to: Date }) {
        this.dateRange = dateRange
    }

    public get next(): DateRangeNode | undefined {
        return this._next
    }

    public set next(next: DateRangeNode | undefined) {
        if (!!next) {
            next._prev = this
        }
        this._next = next
    }

    public get prev(): DateRangeNode | undefined {
        return this._prev
    }

    hasNext(): boolean {
        return !!this.next
    }

    [Symbol.iterator]() {
        let nextItem: DateRangeNode = this
        return {
            next: () => {
                const value = nextItem?.dateRange
                const done = !nextItem
                if (!done) {
                    nextItem = nextItem.next!
                }
                return {
                    value,
                    done
                }
            }
        }
    }
}