/**
 * Represents an Event
 */
export default class Event {
    name: string
    once: boolean
    execute: (...args: any) => Promise<void> | void

    /**
     * @param {{
     *      name: string,
     *      once: boolean,
     *      execute: (...args: any) => Promise<void> | void
     *  }} object
     */
    constructor(object: {
        name: string
        once?: boolean
        execute: (...args: any) => Promise<void> | void
    }) {
        this.name = object.name
        this.once = object.once ?? false
        this.execute = object.execute
    }
}
