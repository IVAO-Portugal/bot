const Command = require('../modules/commands/command');
const {
    Interaction, // eslint-disable-line no-unused-vars
    MessageEmbed
} = require('discord.js');
const axios = require('axios').default;

module.exports = class ClearChannelCommand extends Command {
    constructor(client) {
        super(client, {
            description: 'Obtains a METAR for the specified airport ICAO',
            internal: true,
            name: 'metar',
            options: [
                {
                    description: 'ICAO of the airport to search',
                    name: 'icao',
                    required: true,
                    type: Command.option_types.STRING
                }
            ]
        });
    }

    /**
     * @param {Interaction} interaction
     * @returns {Promise<void|any>}
     */
    async execute(interaction) {
        await interaction.reply({
            components: [],
            ephemeral: false,
            embeds: [
                new MessageEmbed()
                    .setColor('#0d2c99')
                    .setTitle('Loading... Stand by! :mag:')
            ],
        });

        try {
            if(interaction.options.getString('icao').length !== 4) {
                throw new Error('ICAO incorrect')
            }

            let metarData = await axios.get(`https://pt.ivao.aero/api/airport/${interaction.options.getString('icao')}/metar`)

            await interaction.editReply({
                components: [],
                ephemeral: false,
                embeds: [
                    new MessageEmbed()
                        .setColor("#2EC662")
                        .setTitle('METAR for ' + interaction.options.getString('icao').toUpperCase())
                        .setFields([
                            {
                                name: 'Lastest METAR:',
                                value: metarData.data
                            }
                        ])
                ],
            });
        } catch (e) {
            await interaction.editReply({
                components: [],
                ephemeral: false,
                embeds: [
                    new MessageEmbed()
                        .setColor("#E93434")
                        .setTitle('Error :x:')
                ],
            });
            console.log(e);
        }
    }
};