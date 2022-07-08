require('dotenv').config()
import { Client, Intents, Collection } from 'discord.js'
import { readdirSync } from 'fs'
import ApplicationCommand from './templates/ApplicationCommand'
import Event from './templates/Event'
import MessageCommand from './templates/MessageCommand'
const token = process.env.TOKEN ?? require('./config.json').token

// Discord client object
global.client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES], partials: ['CHANNEL'] })

// Set each command in the commands folder as a command in the client.commands collection
client.commands = new Collection()

const commandFiles: string[] = readdirSync('./commands').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command: ApplicationCommand = require(`./commands/${file}`)
    client.commands.set(command.name, command)
}

// same as above but for message commands
client.msgCommands = new Collection()

const msgCommandFiles: string[] = readdirSync('./messageCommands').filter(file => file.endsWith('.js'))
for (const file of msgCommandFiles) {
    const command: MessageCommand = require(`./messageCommands/${file}`)
    client.msgCommands.set(command.name, command)
}

// Event handling
const eventFiles: string[] = readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
    const event: Event = require(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args))
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
}

client.login(token)
