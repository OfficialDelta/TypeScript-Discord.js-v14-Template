/**
 * Represents an Event
 */
export default class Event {
    name: string
    once: boolean
    execute: Function

    /**
     * @param {{
     *      name: string,
     *      once: boolean,
     *      execute: Function
     *  }} object
     */
    constructor(object: {name: string, once?: boolean, execute: Function}) {
        this.name = object.name
        this.once = object.once ?? false
        this.execute = object.execute
    }
}