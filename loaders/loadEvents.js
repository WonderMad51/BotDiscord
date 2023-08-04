const fs = require("fs");

module.exports = async bot => (await fs.promises.readdir("./events"))
    .filter(filePath => filePath.endsWith(".js"))
    .reduce((bot, jsFilePath) => {
        const events = require(`../events/${jsFilePath}`);

        events.getOnces().map(event => {
            if (event.once) {
                bot.once(event.name, (...args) => event.handler(...args));

            }
            else {
                bot.on(event.name, (...args) => event.handler(...args));
            }

            console.log(`Event "${event.name}" enregistré depuis "${jsFilePath}" !`);
        });

        return bot;

    }, bot);
