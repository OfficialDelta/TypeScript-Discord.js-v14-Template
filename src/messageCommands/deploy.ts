/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { readdirSync } from 'fs'
import type ApplicationCommand from '../templates/ApplicationCommand.js'
import MessageCommand from '../templates/MessageCommand.js'
import { REST } from '@discordjs/rest'
import { RESTPostAPIApplicationCommandsJSONBody, Routes } from 'discord.js'
import { default as config } from '../config.json' assert { type: 'json' }

const { TOKEN, CLIENT_ID, OWNER_ID } = process.env as {
    TOKEN: string
    CLIENT_ID: string
    OWNER_ID: string
}

export default new MessageCommand({
    name: 'deploy',
    description: 'Deploys the slash commands',
    async execute(message, args): Promise<void> {
        if (message.author.id !== OWNER_ID) return

        if (!args[0]) {
            await message.reply({
                content: `Incorrect number of arguments! The correct format is \`${config.prefix}deploy <guild/global>\``
            })
            return
        }

        console.log(`Undeploying commands by ${message.author.tag}!}`)

        if (args[0].toLowerCase() === 'global') {
            // global deployment

            const commands: RESTPostAPIApplicationCommandsJSONBody[] = []
            const commandFiles: string[] = readdirSync('./commands').filter(
                (file) => file.endsWith('.js') || file.endsWith('.ts')
            )

            for (const file of commandFiles) {
                const command: ApplicationCommand = (
                    await import(`../commands/${file}`)
                ).default as ApplicationCommand
                const commandData = command.data.toJSON()
                commands.push(commandData)
            }

            const rest = new REST({ version: '10' }).setToken(TOKEN)

            try {
                console.log('Started refreshing application (/) commands.')

                await rest.put(Routes.applicationCommands(CLIENT_ID), {
                    body: commands
                })

                console.log('Successfully reloaded application (/) commands.')
            } catch (error) {
                console.error(error)
            }

            await message.reply({ content: 'Deploying!' })
        } else if (args[0].toLowerCase() === 'guild') {
            // guild deployment

            const commands: RESTPostAPIApplicationCommandsJSONBody[] = []
            const commandFiles: string[] = readdirSync('./commands').filter(
                (file) => file.endsWith('.js') || file.endsWith('.ts')
            )

            for (const file of commandFiles) {
                const command: ApplicationCommand = (
                    await import(`../commands/${file}`)
                ).default as ApplicationCommand
                const commandData = command.data.toJSON()
                commands.push(commandData)
            }

            const rest = new REST({ version: '10' }).setToken(TOKEN)

            try {
                console.log('Started refreshing application (/) commands.')

                await rest.put(
                    Routes.applicationGuildCommands(
                        CLIENT_ID,
                        message.guild?.id as string
                    ),
                    {
                        body: commands
                    }
                )

                console.log('Successfully reloaded application (/) commands.')
            } catch (error) {
                console.error(error)
            }

            await message.reply({ content: 'Deploying!' })
        }
    }
})
