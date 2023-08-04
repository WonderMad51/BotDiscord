const fs = require("fs");

module.exports = async commands => (await fs.promises.readdir("./commands"))
    .filter(filePath => filePath.endsWith(".js"))
    .reduce((commands, jsFilePath) => {
        const command = require(`../commands/${jsFilePath}`);

        commands.set(command.data.name, command);
        console.log(`Commande "${command.data.name}"" chargée depuis "${jsFilePath}" !`);

        return commands;

    }, commands);
