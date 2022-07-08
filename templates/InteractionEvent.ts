import { Interaction } from 'discord.js'
import Event from '../templates/Event'

export default class InteractionEvent extends Event {
    /**
     * @param {{
     *      name: string,
     *      once?: boolean,
     *      execute: (interaction: Interaction) => Promise<void> | void
     *  }} object
     */
    constructor(object: {
        name: string
        once?: boolean
        execute: (interaction: Interaction) => Promise<void> | void
    }) {
        super(object)
    }
}
