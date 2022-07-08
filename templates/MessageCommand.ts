import { Message } from 'discord.js'
import BaseCommand from './BaseCommand'

/*
 * Represents a Message Command
 */
export default class MessageCommand extends BaseCommand {
    aliases?: string[]

    /**
     * @param {{
     *      name: string,
     *      description: string,
     *      aliases?: string[],
     *      execute: (message: Message, args: string[]) => Promise<void>
     *  }} options - The options for the message command
     */
    constructor(options: {name: string, description: string, aliases?: string[], execute: (message: Message, args: string[]) => Promise<void>}) {
        super(options)
        this.aliases = options.aliases
    }
}