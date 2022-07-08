import { ApplicationCommandPermissions, CommandInteraction } from 'discord.js'
import BaseCommand from './BaseCommand'

type ApplicationCommandOptions = {
    name: string,
    description: string,
    type: ('SUB_COMMAND'|'SUB_COMMAND_GROUP'|'STRING'|'INTEGER'|'NUMBER'|'boolean'|'USER'|'CHANNEL'|'ROLE'|'MENTIONABLE'),
    choices?: {
        name: string,
        value: (string|number)
    }[],
    options?: ApplicationCommandOptions[],
    channel_types?: ('GUILD_TEXT'|'DM'|'GUILD_VOICE'|'GROUP_DM'|'GUILD_CATEGORY'|'GUILD_NEWS'|'GUILD_STORE'|'GUILD_NEWS_THREAD'|'GUILD_PUBLIC_THREAD'|'GUILD_PRIVATE_THREAD'|'GUILD_STAGE_VOICE')[],
    min_value?: number,
    max_value?: number,
    autocomplete?: boolean,
    required: boolean
}

/**
 * Represents a Slash Command
 */
export default class ApplicationCommand extends BaseCommand {
    permissions: ApplicationCommandPermissions[]
    options: ApplicationCommandOptions[]
    type: 'CHAT_INPUT'|'USER'|'MESSAGE'
    defaultPermission: boolean

    /**
     * @param {{
     *      name: string, 
     *      description: string,
     *      permissions?: ApplicationCommandPermissions[],
     *      options?: ApplicationCommandOptions[],
     *      defaultPermission?: boolean,
     *      type: 'CHAT_INPUT'|'USER'|'MESSAGE',
     *      execute: (interaction: CommandInteraction) => Promise<void>
     *  }} options - The options for the slash command
     */
    constructor(options: {name: string, description: string, permissions?: ApplicationCommandPermissions[], options?: ApplicationCommandOptions[], defaultPermission?: boolean, type: 'CHAT_INPUT'|'USER'|'MESSAGE', execute: (interaction: CommandInteraction) => Promise<void>}) {
        super(options)
        this.permissions = options.permissions ?? []
        this.options = options.options ?? []
        this.type = options.type ?? 'CHAT_INPUT'
        this.defaultPermission = options.defaultPermission ?? true
    }

    /**
     * @param {{
     *      id: string,
     *      type: ('USER'|'ROLE'),
     *      permission: boolean
     *  }[]} permissions - The permissions
     */
    setPermissions(permissions: {id: string, type: ('USER'|'ROLE'), permission: boolean}[]): void {
        this.permissions = permissions
    }

    /**
     * @param {ApplicationCommandOptions[]} options - The options
     */
    setOptions(options: ApplicationCommandOptions[]): void {
        this.options = options
    }
}
