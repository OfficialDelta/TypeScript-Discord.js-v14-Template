import type { ChatInputCommandInteraction } from 'discord.js'

/**
 * Represents a SubCommand
 */
export default class SubCommand {
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void

    /**
     *
     * @param {{
     *      execute: Function
     *  }} options - The options for the subcommand
     */
    constructor(options: {
        execute: (
            interaction: ChatInputCommandInteraction
        ) => Promise<void> | void
    }) {
        this.execute = options.execute
    }

    /**
     * @param {(interaction: ChatInputCommandInteraction) => Promise<void> | void} executeFunction - The function
     */
    setExecute(
        executeFunction: (
            interaction: ChatInputCommandInteraction
        ) => Promise<void> | void
    ): void {
        this.execute = executeFunction
    }
}
