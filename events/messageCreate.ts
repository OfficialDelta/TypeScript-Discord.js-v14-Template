import MessageCommand from '../templates/MessageCommand'
import MessageEvent from '../templates/MessageEvent'
const { prefix } = require('../config.json')

export default new MessageEvent({
    name: 'messageCreate',
    async execute(message) {
        // Handles non-slash commands, only recommended for deploy commands

        // filters out bots and non-prefixed messages
        if (!message.content.startsWith(prefix) || message.author.bot) return

        // fetches the application owner for the bot
        if (!client.application?.owner) await client.application?.fetch()

        // get the arguments and the actual command name for the inputted command
        const args = message.content.slice(prefix.length).trim().split(/ +/)
        const commandName = args.shift()!.toLowerCase()

        const command =
            client.msgCommands.get(commandName) ||
            client.commands.find(
                (cmd: MessageCommand) =>
                    cmd.aliases && cmd.aliases.includes(commandName)
            )

        // dynamic command handling
        if (!command) return

        try {
            command.execute(message, args)
        } catch (error) {
            console.error(error)
        }
    },
})
