import { BaseInteraction, Events } from 'discord.js'
import type ApplicationCommand from '../templates/ApplicationCommand.js'
import Event from '../templates/Event.js'

export default new Event({
    name: Events.InteractionCreate,
    async execute(interaction: BaseInteraction): Promise<void> {
        if (interaction.isChatInputCommand()) {
            if (!client.commands.has(interaction.commandName)) return
            try {
                const command: ApplicationCommand = (await client.commands.get(
                    interaction.commandName
                )) as ApplicationCommand

                if (!command.execute) {
                    console.error(
                        `Failed to find execution handler for ${command.data.name}`
                    )
                    await interaction.reply({
                        content:
                            'There was an error while executing this command!',
                        ephemeral: true
                    })
                    return
                }

                await command.execute(interaction)
            } catch (error) {
                console.error(error)
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                })
            }
        } else if (interaction.isAutocomplete()) {
            if (!client.commands.has(interaction.commandName)) return

            try {
                const command: ApplicationCommand = (await client.commands.get(
                    interaction.commandName
                )) as ApplicationCommand

                if (!command.autocomplete) {
                    console.error(
                        `Failed to find autocomplete handler for ${command.data.name}`
                    )
                    await interaction.respond([
                        {
                            name: 'Failed to autocomplete',
                            value: 'error'
                        }
                    ])
                    return
                }

                await command.autocomplete(interaction)
            } catch (error) {
                console.error(error)
            }
        }
    }
})
