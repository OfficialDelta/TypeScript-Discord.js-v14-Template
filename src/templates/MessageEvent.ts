import type { Message } from 'discord.js'
import Event from '../templates/Event'

export default class MessageEvent extends Event {
    /**
     * @param {{
     *      name: string,
     *      once?: boolean,
     *      execute: (message: Message) => Promise<void> | void
     *  }} object
     */
    constructor(object: {
        name: string
        once?: boolean
        execute: (message: Message) => Promise<void> | void
    }) {
        super(object)
    }
}
