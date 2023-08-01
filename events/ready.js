const Discord = require("discord.js")
const loadSlashCommands =("../loaders/loadSlashCommands")

module.exports = async bot => {

    await loadSlashCommands(bot)

    console.log(`${bot.user.tag} est bien en ligne`)

}