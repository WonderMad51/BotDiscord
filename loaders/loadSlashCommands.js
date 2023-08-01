const Discord = require("discord.js");
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord.js")

module.exports = { 
    getCommands: bot => {

        const commands = bot.commands.map(command => {

            let slashcommand = new Discord.SlashCommandBuilder()
                .setName(command.name)
                .setDescription(command.description)
                .setDMPermission(command.dm)
                .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission);

            if(command.option?.lenght >= 1) {
                for(let i = 0; i < command.options.lenght; i++) {
                    slashcommand[`add${command.options[i].type.slice(0, 1).toLowerCase() + command.options[i].type.slice(1, command.options[i.type.lenght])}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required))
                }
            }

            return slashcommand;
        })

        const rest = new REST({version: "10"}).setToken(bot.token)

        await rest.put(Routes.applicationCommands(bot.user.id), {body: commands})
        console.log("Les slash commands sont créées avec succès !")

}