import ApplicationCommand from '../templates/ApplicationCommand'
import InteractionEvent from '../templates/InteractionEvent'

export default new InteractionEvent({
    name: 'interactionCreate',
    async execute(interaction): Promise<void> {
        // Dynamically handle slash commands
        if (!interaction.isCommand()) return

        if (!client.commands.has(interaction.commandName)) return

        try {
            const command: ApplicationCommand = (await client.commands.get(
                interaction.commandName
            )) as ApplicationCommand
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true,
            })
        }
    },
})
