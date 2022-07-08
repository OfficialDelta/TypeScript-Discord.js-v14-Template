/* eslint-disable @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

import dotenv from 'dotenv'
dotenv.config()

import { Client, Intents, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import ApplicationCommand from './templates/ApplicationCommand'
import Event from './templates/Event'
import MessageCommand from './templates/MessageCommand'
const token: string = process.env.TOKEN as string

// Discord client object
global.client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGES,
    ],
    partials: ['CHANNEL'],
})

client.commands = new Collection()
client.msgCommands = new Collection()

// Set each command in the commands folder as a command in the client.commands collection
const commandFiles: string[] = readdirSync('./commands').filter((file) =>
    file.endsWith('.ts')
)
for (const file of commandFiles) {
    const command: ApplicationCommand =
        require(`./commands/${file}`) as ApplicationCommand
    client.commands.set(command.name, command)
}

const msgCommandFiles: string[] = readdirSync('./messageCommands').filter(
    (file) => file.endsWith('.ts')
)
for (const file of msgCommandFiles) {
    const command: MessageCommand =
        require(`./messageCommands/${file}`) as MessageCommand
    client.msgCommands.set(command.name, command)
}

// Event handling
const eventFiles: string[] = readdirSync('./events').filter((file) =>
    file.endsWith('.ts')
)

for (const file of eventFiles) {
    const event: Event = require(`./events/${file}`) as Event
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

await client.login(token)
