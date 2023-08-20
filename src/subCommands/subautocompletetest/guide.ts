import SubCommand from '../../templates/SubCommand.js'

export default new SubCommand({
    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true)
        let choices: string[] = []

        if (focusedOption.name === 'query') {
            choices = [
                'Popular Topics: Threads',
                'Sharding: Getting started',
                'Library: Voice Connections',
                'Interactions: Replying to slash commands',
                'Popular Topics: Embed preview'
            ]
        }

        if (focusedOption.name === 'version') {
            choices = ['v9', 'v11', 'v12', 'v13', 'v14']
        }

        const filtered = choices.filter((choice) =>
            choice.startsWith(focusedOption.value)
        )
        await interaction.respond(
            filtered.map((choice) => ({ name: choice, value: choice }))
        )
    },
    async execute(interaction) {
        const query = interaction.options.getString('query')
        const version = interaction.options.getString('version')
        await interaction.reply(`You searched for ${query} in ${version}!`)
    }
})
