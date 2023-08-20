/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config'

import { Client, GatewayIntentBits, Collection, Partials } from 'discord.js'
import { readdirSync } from 'fs'
import type ApplicationCommand from './templates/ApplicationCommand.js'
import type Event from './templates/Event.js'
import type MessageCommand from './templates/MessageCommand.js'
import deployGlobalCommands from './deployGlobalCommands.js'
const { TOKEN } = process.env

await deployGlobalCommands()

// Discord client object
global.client = Object.assign(
    new Client({
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent
        ],
        partials: [Partials.Channel]
    }),
    {
        commands: new Collection<string, ApplicationCommand>(),
        msgCommands: new Collection<string, MessageCommand>()
    }
)

// Set each command in the commands folder as a command in the client.commands collection
const commandFiles: string[] = readdirSync('./commands').filter(
    (file) => file.endsWith('.js') || file.endsWith('.ts')
)
for (const file of commandFiles) {
    const command: ApplicationCommand = (await import(`./commands/${file}`))
        .default as ApplicationCommand
    client.commands.set(command.data.name, command)
}

const msgCommandFiles: string[] = readdirSync('./messageCommands').filter(
    (file) => file.endsWith('.js') || file.endsWith('.ts')
)
for (const file of msgCommandFiles) {
    const command: MessageCommand = (await import(`./messageCommands/${file}`))
        .default as MessageCommand
    client.msgCommands.set(command.name, command)
}

// Event handling
const eventFiles: string[] = readdirSync('./events').filter(
    (file) => file.endsWith('.js') || file.endsWith('.ts')
)

for (const file of eventFiles) {
    const event: Event = (await import(`./events/${file}`)).default as Event
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

await client.login(TOKEN)
