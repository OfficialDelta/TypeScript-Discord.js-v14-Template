import { BaseInteraction, Events } from 'discord.js'
import type ApplicationCommand from '../templates/ApplicationCommand.js'
import Event from '../templates/Event.js'

export default new Event({
    name: Events.InteractionCreate,
    async execute(interaction: BaseInteraction): Promise<void> {
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
