const Discord = require("discord.js");  // Importation discord.js doc
const config = require("./config");     // Appel du fichier config.js

const CommandLoader = require("./loaders/loadCommands");   // Chargé les fichiers avec lesquels on va travailler
const EventLoader = require("./loaders/loadEvents");

(async () => {

    // Init Discord bot
    const bot = new Discord.Client({
        intents: [Discord.GatewayIntentBits.Guilds]
    });

    // Register commands
    bot.commands = await CommandLoader(
        new Discord.Collection()
    );

    // Register events
    await EventLoader(bot);

    // Login
    await bot.login(config.token);

    // Init Rest API client
    const api = new Discord.REST().setToken(config.token);

    try {
        const response = await api.put(
            Discord.Routes.applicationGuildCommands(config.clientId, config.guildId),
            { body: bot.commands.map(({data}) => data.toJSON())}
        );
    }
    catch (err) {
        console.error(err);
        process.exit(0);
    }

})(...process.argv);
