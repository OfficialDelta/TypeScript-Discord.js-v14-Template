import type {
    CommandInteraction,
    ContextMenuCommandBuilder,
    SlashCommandBuilder,
} from 'discord.js'

/**
 * Represents an Application Command
 */
export default class ApplicationCommand {
    data: SlashCommandBuilder | ContextMenuCommandBuilder
    execute: (interaction: CommandInteraction) => Promise<void> | void

    /**
     * @param {{
     *      data: SlashCommandBuilder | ContextMenuCommandBuilder
     *      execute: (interaction: CommandInteraction) => Promise<void> | void
     *  }} options - The options for the slash command
     */
    constructor(options: {
        data: SlashCommandBuilder | ContextMenuCommandBuilder
        execute: (interaction: CommandInteraction) => Promise<void> | void
    }) {
        this.execute = options.execute
        this.data = options.data
    }
}
