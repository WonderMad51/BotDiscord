const Discord = require("discord.js");
const loadEvents = require("../loaders/loadEvents");

module.exports = async (bot, message) => {

    let prefix = "/";

    let messsageArray = message.content.split(" ")
    let commandName = messageArray[0].slice(prefix.length)
    let args = messageArray.slice(1)

    if(!message.content.startsWith(prefix)) return;

    let command = require(`../commands/${commandName}`)
    if(!command) return message.reply("Commande inexistante !")

    command.run(bot, message, args)
}