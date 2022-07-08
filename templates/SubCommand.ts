/**
 * Represents a SubCommand
 */
export default class SubCommand {
    execute: Function

    /**
     * 
     * @param {{
     *      execute: Function
     *  }} options - The options for the subcommand
     */
    constructor(options: {execute: Function}) {
        this.execute = options.execute
    }

    /**
     * @param {Function} executeFunction - The function
     */
    setExecute(executeFunction: Function): void {
        this.execute = executeFunction
    }
}