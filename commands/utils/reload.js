const {SlashCommandBuilder} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reloads a command")
        .addStringOption(option => option
            .setName("command")
            .setDescription("Command to reload")
            .setRequired(true)),
    async execute(interaction) {
        const commandName = interaction.options.getString("command");
        const command = interaction.client.commands.get(commandName)

        if (!command) {
            interaction.reply("Command does not exist!");
            return;
        }

        delete require.cache[require.resolve(`./${command.data.name}.js`)];
        interaction.client.commands.delete(commandName.data.name);
        const newCommand = require(`./${command.data.name}.js`);
        interaction.client.commands.set(newCommand);
        interaction.reply(`${commandName} is reloaded!`);
    },
}