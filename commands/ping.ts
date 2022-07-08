import ApplicationCommand from '../templates/ApplicationCommand'

export default new ApplicationCommand({
    name: 'ping',
    description: 'Replies with Pong!',
    type: 'CHAT_INPUT',
    async execute(interaction): Promise<void> {
        await interaction.reply('Pong!')
    }
})