import {
    SlashCommandBuilder,
    SlashCommandSubcommandBuilder,
    SlashCommandSubcommandGroupBuilder,
} from 'discord.js'
import ApplicationCommand from '../templates/ApplicationCommand.js'

export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName('subcommandtest')
        .setDescription('A test for subcommands')
        .addSubcommandGroup(
            new SlashCommandSubcommandGroupBuilder()
                .setName('grouptest')
                .setDescription('A test for subcommand groups')
                .addSubcommand(
                    new SlashCommandSubcommandBuilder()
                        .setName('pingping')
                        .setDescription('Replies pongpong!')
                )
        )
        .addSubcommand(
            new SlashCommandSubcommandBuilder()
                .setName('test')
                .setDescription('A test subcommand')
        ),
    hasSubCommands: true,
})
