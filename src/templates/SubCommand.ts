import { CommandInteraction } from 'discord.js'

/**
 * Represents a SubCommand
 */
export default class SubCommand {
    execute: (interaction: CommandInteraction) => Promise<void> | void

    /**
     *
     * @param {{
     *      execute: Function
     *  }} options - The options for the subcommand
     */
    constructor(options: {
        execute: (interaction: CommandInteraction) => Promise<void> | void
    }) {
        this.execute = options.execute
    }

    /**
     * @param {(interaction: CommandInteraction) => Promise<void> | void} executeFunction - The function
     */
    setExecute(
        executeFunction: (
            interaction: CommandInteraction
        ) => Promise<void> | void
    ): void {
        this.execute = executeFunction
    }
}
