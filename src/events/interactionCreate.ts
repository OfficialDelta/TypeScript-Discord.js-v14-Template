import { CommandInteraction, Events } from 'discord.js'
import type ApplicationCommand from '../templates/ApplicationCommand'
import Event from '../templates/Event'

export default new Event({
    name: Events.ClientReady,
    async execute(interaction: CommandInteraction): Promise<void> {
        // Dynamically handle slash commands
        if (!interaction.isChatInputCommand()) return

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
