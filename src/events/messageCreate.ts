import type MessageCommand from '../templates/MessageCommand'
import { prefix } from '../config.json'
import Event from '../templates/Event'
import { Events, Message } from 'discord.js'

export default new Event({
    name: Events.MessageCreate,
    async execute(message: Message): Promise<void> {
        // Handles non-slash commands, only recommended for deploy commands

        // filters out bots and non-prefixed messages
        if (!message.content.startsWith(prefix) || message.author.bot) return

        // fetches the application owner for the bot
        if (!client.application?.owner) await client.application?.fetch()

        // get the arguments and the actual command name for the inputted command
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = (<string>args.shift()).toLowerCase()

        const command =
            (client.msgCommands.get(commandName) as MessageCommand) ||
            (client.msgCommands.find(
                (cmd: MessageCommand): boolean =>
                    cmd.aliases && cmd.aliases.includes(commandName)
            ) as MessageCommand)

        // dynamic command handling
        if (!command) return

        try {
            await command.execute(message, args)
        } catch (error) {
            console.error(error)
        }
    },
})
