const { Events } = require('discord.js');
const BookingForm = require("../form/booking_form.js");

async function handleSlashCommand(interaction)
{
    const calledCommand = interaction.client.commands.get(interaction.commandName);

    if (!calledCommand) {
        throw new Error(`Command "${interaction.commandName}" not found.`);
    }

    return await calledCommand.execute(interaction);
}

async function handleModal(interaction)
{
    if (interaction.customId != BookingForm.name) {
        throw new Error(`Modal "${interaction.customId}" is not defined.`);
    }

    return await BookingForm.handle(interaction);
}

module.exports = {
    getOnces: () => {
        return [
            {
                name: Events.InteractionCreate,
                once: false,
                handler: async (interaction) => {
                    try {
                        switch (true) {

                            // Slash Command ?
                            case interaction.isChatInputCommand():
                                return handleSlashCommand(interaction);

                            // Modal ?
                            case interaction.isModalSubmit():
                                return handleModal(interaction);

                            default:
                                throw new Error('Unhandled interaction type.');
                        }
                    }
                    catch(error) {
                        console.error(error);

                        if (interaction.replied || interaction.deferred) {
                            await interaction.followUp({ content: 'An error occured while handleling request.', ephemeral: true });

                            return;
                        }

                        await interaction.reply({ content: 'An error occured while handleling request.', ephemeral: true });
                    }
                }
            }
        ];
    }
}
