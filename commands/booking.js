const Discord = require("discord.js");
const BookingForm = require("../form/booking_form.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('booking')
        // .addStringOption(option => option.setName('date').setDescription('Date de réservation (DD/MM)'))
        // .addStringOption(option => option.setName('heure').setDescription('Heure de réservation (hh:mm)'))
        // .addStringOption(option => option.setName('nombre').setDescription('Nombre de personnes'))
        .setDescription('Réserver une table au café.'),

    execute: async (interaction) => await interaction.showModal(BookingForm.build())
};
