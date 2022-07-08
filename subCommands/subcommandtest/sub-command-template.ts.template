const SubCommand = require('../../templates/SubCommand')

module.exports = new SubCommand({
    async execute(interaction) {
        const input = interaction.options.get('input')?.value ?? false

        const response = input ? `You inputted: ${input}` : "You didn't input anything"

        interaction.reply(response)
    },
})
