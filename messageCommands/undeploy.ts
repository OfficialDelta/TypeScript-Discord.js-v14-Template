const { prefix } = require('../config.json')
import MessageCommand from '../templates/MessageCommand'

export default new MessageCommand({
    name: 'undeploy',
    description: 'Undeploys the slash commands',
    async execute(message, args): Promise<void> {
        if (message.author.id !== client.application!.owner!.id) return

        if (args.length < 1) {
            message.reply(
                `Incorrect number of arguments! The correct format is \`${prefix}undeploy <guild/global>\``
            )
            return
        }

        if (args[0].toLowerCase() === 'global') {
            // global undeployment

            // undeploy the commands
            await client.application?.commands.set([])

            message.reply('Undeploying!')
        } else if (args[0].toLowerCase() === 'guild') {
            // guild deployment

            // undeploy the commands
            await message.guild?.commands.set([])

            message.reply('Undeploying!')
        }
    },
})
