import type {
    ChatInputCommandInteraction,
    AutocompleteInteraction,
} from 'discord.js'

/**
 * Represents a SubCommand
 */
export default class SubCommand {
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>
    autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>

    /**
     *
     * @param {{
     *      execute: Function
     *      autocomplete?: Function
     *  }} options - The options for the subcommand
     */
    constructor(options: {
        execute: (interaction: ChatInputCommandInteraction) => Promise<void>
        autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>
    }) {
        this.execute = options.execute
        if (options.autocomplete) {
            this.autocomplete = options.autocomplete
        }
    }

    /**
     * Set the autocomplete function of the subcommand
     * @param {(interaction: AutocompleteInteraction) => Promise<void>} autocompleteFunction - The function
     */
    setAutocomplete(
        autocompleteFunction: (
            interaction: AutocompleteInteraction
        ) => Promise<void>
    ): void {
        this.autocomplete = autocompleteFunction
    }

    /**
     * Set the execute function of the subcommand
     * @param {(interaction: ChatInputCommandInteraction) => Promise<void>} executeFunction - The function
     */
    setExecute(
        executeFunction: (
            interaction: ChatInputCommandInteraction
        ) => Promise<void>
    ): void {
        this.execute = executeFunction
    }
}
