import { Message } from 'discord.js'
import Event from '../templates/Event'

export default class MessageEvent extends Event {
    /**
     * @param {{
     *      name: string,
     *      once?: boolean,
     *      execute: (message: Message) => Promise<void>
     *  }} object
     */
    constructor(object: {name: string, once?: boolean, execute: (message: Message) => Promise<void>}) {
        super(object)
    }
}