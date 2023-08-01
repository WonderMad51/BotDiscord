const Discord = require("discord.js")                   // Importation discord.js doc




const intents = new Discord.IntentsBitField(3276799)    // Donation des droits au bot
const bot = new Discord.Client({intents}) 
              // 
const loadCommands = require("./loaders/loadCommands")   // Chargé les fichiers avec lesquels on va travailler
const loadEvents = require("./loaders/loadEvents")
const config = require("./config")                      // Appel du fichier config.js

bot.login(config.token)                                 // Importation du token pour connecter le bot

bot.commands = new Discord.Collection()
loadCommands(bot)
loadEvents(bot)


(async () => 