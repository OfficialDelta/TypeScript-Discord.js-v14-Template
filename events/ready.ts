import Event from '../templates/Event'

module.exports = new Event({
    name: 'ready',
    once: true,
    execute() {
        // Runs when the bot logs in
        console.log(`Logged in as ${client?.user?.tag}!`)
    }
})