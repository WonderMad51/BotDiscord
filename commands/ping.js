const Discord = require("discord.js")

module.exports = {

    name: "ping",
    description: "affichage la latence",
    permission: "Aucune",
    dm: true,

    run: async (bot, message) => await message.reply(`Pong: \`${bot.ws.ping}\``),
};