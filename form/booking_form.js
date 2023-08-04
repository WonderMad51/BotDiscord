const Discord = require("discord.js");
const moment = require('moment');

const modalId = 'booking_form';

module.exports = {
    name: modalId,
    build: () => {
        const modal = new Discord.ModalBuilder()
            .setCustomId(modalId)
            .setTitle('Réserver');

        const inputs = [
            new Discord.TextInputBuilder()
                .setCustomId('date')
                .setLabel('Date')
                .setStyle(Discord.TextInputStyle.Short),
            new Discord.TextInputBuilder()
                .setCustomId('time')
                .setLabel('Heure')
                .setStyle(Discord.TextInputStyle.Short),
            new Discord.TextInputBuilder()
                .setCustomId('nb_players')
                .setLabel('Nombre de joueurs')
                .setStyle(Discord.TextInputStyle.Short)
        ];

        modal.addComponents(...inputs.map(input => new Discord.ActionRowBuilder().addComponents(input)));

        return modal;
    },
    handle: async (interaction) => {

        const datetime = moment([
            interaction.fields.getTextInputValue('date').replace(/([0-9]{1,2})[^0-9]+([0-9]{1,2})/,`${moment().year()}-$2-$1`),
            interaction.fields.getTextInputValue('time').replace(/([0-9]{1,2})[^0-9]+([0-9]{1,2})/,'$1-$2')
        ].join(' '));

        const booking = {
            customer: {
                discord_id: interaction.user.id,
                discord_name: interaction.user.username,
                roles: await interaction.member.roles.cache.map(({name}) => name)
            },
            date: datetime,
            nb_players: interaction.fields.getTextInputValue('nb_players')
        };

        return await interaction.reply(`La demande de réservation a été enregistrée pour ${booking.nb_players} joueurs-ses, le ${booking.date.format('DD/MM/YY à HH:mm')}, au nom de "${booking.customer.discord_name}".`);
    }
}
