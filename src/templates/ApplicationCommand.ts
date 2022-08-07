import type {
    ApplicationCommandOptionAllowedChannelTypes,
    ApplicationCommandOptionType,
    ApplicationCommandPermissions,
    ApplicationCommandPermissionType,
    ApplicationCommandType,
    CommandInteraction,
} from 'discord.js'
import BaseCommand from './BaseCommand.js'

type ApplicationCommandOptions = {
    name: string
    description: string
    type: ApplicationCommandOptionType
    choices?: {
        name: string
        value: string | number
    }[]
    options?: ApplicationCommandOptions[]
    channel_types?: ApplicationCommandOptionAllowedChannelTypes[]
    min_value?: number
    max_value?: number
    autocomplete?: boolean
    required: boolean
}

/**
 * Represents an Application Command
 */
export default class ApplicationCommand extends BaseCommand {
    permissions: ApplicationCommandPermissions[]
    options: ApplicationCommandOptions[]
    type: ApplicationCommandType
    defaultPermission: boolean
    override execute: (interaction: CommandInteraction) => Promise<void> | void

    /**
     * @param {{
     *      name: string,
     *      description: string,
     *      permissions?: ApplicationCommandPermissions[],
     *      options?: ApplicationCommandOptions[],
     *      defaultPermission?: boolean,
     *      type: ApplicationCommandType
     *      execute: (interaction: CommandInteraction) => Promise<void> | void
     *  }} options - The options for the slash command
     */
    constructor(options: {
        name: string
        description: string
        permissions?: ApplicationCommandPermissions[]
        options?: ApplicationCommandOptions[]
        defaultPermission?: boolean
        type: ApplicationCommandType
        execute: (interaction: CommandInteraction) => Promise<void> | void
    }) {
        super(options)
        this.execute = options.execute
        this.permissions = options.permissions ?? []
        this.options = options.options ?? []
        this.type = options.type ?? 'CHAT_INPUT'
        this.defaultPermission = options.defaultPermission ?? true
    }

    /**
     * @param {{
     *      id: string,
     *      type: ApplicationCommandPermissionType,
     *      permission: boolean
     *  }[]} permissions - The permissions
     */
    setPermissions(
        permissions: {
            id: string
            type: ApplicationCommandPermissionType
            permission: boolean
        }[]
    ): void {
        this.permissions = permissions
    }

    /**
     * @param {ApplicationCommandOptions[]} options - The options
     */
    setOptions(options: ApplicationCommandOptions[]): void {
        this.options = options
    }
}
