const Discord = require("discord.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong !'),
    execute: async (interaction) => await interaction.reply(`Pong !`),
};
