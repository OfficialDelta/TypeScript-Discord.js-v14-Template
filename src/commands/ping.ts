import { ApplicationCommandType } from 'discord.js'
import ApplicationCommand from '../templates/ApplicationCommand.js'

export default new ApplicationCommand({
    name: 'ping',
    description: 'Replies with Pong!',
    type: ApplicationCommandType.ChatInput,
    async execute(interaction): Promise<void> {
        await interaction.reply('Pong!')
    },
})
