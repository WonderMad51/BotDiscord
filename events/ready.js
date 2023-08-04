const { Events } = require('discord.js');

module.exports = {
    getOnces: () => {
        return [
            {
                name: Events.ClientReady,
                once: true,
                handler: (client) => {
                    console.log('Bot connecté.');
                }
            }
        ];
    }
}
