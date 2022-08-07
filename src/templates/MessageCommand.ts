import type { Message } from 'discord.js'
import BaseCommand from './BaseCommand.js'

/*
 * Represents a Message Command
 */
export default class MessageCommand extends BaseCommand {
    aliases: string[]
    override execute: (message: Message, args: string[]) => Promise<void> | void

    /**
     * @param {{
     *      name: string,
     *      description: string,
     *      aliases?: string[],
     *      execute: (message: Message, args: string[]) => Promise<void> | void
     *  }} options - The options for the message command
     */
    constructor(options: {
        name: string
        description: string
        aliases?: string[]
        execute: (message: Message, args: string[]) => Promise<void> | void
    }) {
        super(options)
        this.execute = options.execute
        this.aliases = options.aliases ?? []
    }
}
