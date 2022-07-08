/**
 * Base class for all commands
 * @abstract
 */
export default class BaseCommand {
    name: string
    description: string
    execute: Function

    /**
     * @param {{
     *      name: string,
     *      description: string,
     *      execute: Function
     *  }} object
     */
    constructor(object: {name: string, description: string, execute: Function}) {
        this.name = object.name
        this.description = object.description
        this.execute = object.execute
    }

    /**
     * @param {string} name - The name
     */
    setName(name: string): void {
        this.name = name
    }

    /**
     * @param {string} description - The description
     */
    setDescription(description: string): void {
        this.description = description
    }

    /**
     * @param {Function} executeFunction - The function
     */
    setExecute(executeFunction: Function): void {
        this.execute = executeFunction
    }
}
