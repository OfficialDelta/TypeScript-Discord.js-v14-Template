/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { REST } from '@discordjs/rest'
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import { readdirSync } from 'fs'
import type ApplicationCommand from './templates/ApplicationCommand.js'
const { TOKEN, CLIENT_ID } = process.env

export default async function deployGlobalCommands() {
    const commands: RESTPostAPIApplicationCommandsJSONBody[] = []
    const commandFiles: string[] = readdirSync('./commands').filter(
        (file) => file.endsWith('.js') || file.endsWith('.ts')
    )

    for (const file of commandFiles) {
        const command: ApplicationCommand = (await import(`./commands/${file}`))
            .default as ApplicationCommand
        const commandData = command.data.toJSON()
        commands.push(commandData)
    }

    const rest = new REST({ version: '10' }).setToken(TOKEN as string)

    try {
        console.log('Started refreshing application (/) commands.')

        await rest.put(Routes.applicationCommands(CLIENT_ID as string), {
            body: []
        })

        await rest.put(Routes.applicationCommands(CLIENT_ID as string), {
            body: commands
        })

        console.log('Successfully reloaded application (/) commands.')
    } catch (error) {
        console.error(error)
    }
}
