const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping!'),
	async execute(interaction) {
		const reply = await interaction.reply({content: "Pinging...", fetchReply: true});
		interaction.editReply({ content: 'Pong in '+(reply.createdTimestamp - interaction.createdTimestamp)+' ms!' });
	},
};
