import {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder
} from 'discord.js'
import ApplicationCommand from '../templates/ApplicationCommand.js'

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName('subautocompletetest')
        .setDescription('A test for autocomplete subcommands')
        .addSubcommandGroup(
            new SlashCommandSubcommandGroupBuilder()
                .setName('autocompletegroup')
                .setDescription('A test for autocomplete subcommand groups')
                .addSubcommand(
                    new SlashCommandSubcommandBuilder()
                        .setName('guidesub')
                        .setDescription('Search a guide!')
                        .addStringOption((option) =>
                            option
                                .setName('query')
                                .setDescription('Phrase to search for')
                                .setAutocomplete(true)
                                .setRequired(true)
                        )
                        .addStringOption((option) =>
                            option
                                .setName('version')
                                .setDescription('Version to search in')
                                .setAutocomplete(true)
                                .setRequired(true)
                        )
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName('guide')
                .setDescription('Search a guide!')
                .addStringOption((option) =>
                    option
                        .setName('query')
                        .setDescription('Phrase to search for')
                        .setAutocomplete(true)
                        .setRequired(true)
                )
                .addStringOption((option) =>
                    option
                        .setName('version')
                        .setDescription('Version to search in')
                        .setAutocomplete(true)
                        .setRequired(true)
                )
        ),
    hasSubCommands: true
})
