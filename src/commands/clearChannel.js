const Command = require('../modules/commands/command');
const {
    Interaction, // eslint-disable-line no-unused-vars
    MessageActionRow,
    MessageButton,
    MessageEmbed
} = require('discord.js');

module.exports = class ClearChannelCommand extends Command {
    constructor(client) {
        super(client, {
            description: 'Clears all the messages in a channel',
            internal: true,
            name: 'clear-channel',
            hq_only: true
        });
    }

    /**
     * @param {Interaction} interaction
     * @returns {Promise<void|any>}
     */
    async execute(interaction) {
        await interaction.reply({
            components: [
                new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId(`confirm_delete:${interaction.id}`)
                            .setLabel('Confirmar')
                            .setEmoji('✅')
                            .setStyle('SUCCESS')
                    )
                    .addComponents(
                        new MessageButton()
                            .setCustomId(`cancel_delete:${interaction.id}`)
                            .setLabel('Cancelar')
                            .setEmoji('❌')
                            .setStyle('SECONDARY')
                    )
            ],
            embeds: [
                new MessageEmbed()
                    .setColor("DEFAULT")
                    .setTitle('Alerta!')
                    .setDescription('Deseja mesmo limpar todo o histórico deste canal?')
            ],
            ephemeral: true
        });

        const filter = i => i.user.id === interaction.user.id && i.customId.includes(interaction.id);
        const collector = interaction.channel.createMessageComponentCollector({
            filter,
            time: 60000 * 60 // 60 minutes
        });

        collector.on('collect', async i => {
            await i.deferUpdate();

            await i.editReply({
                components: [],
                ephemeral: true,
                embeds: [
                    new MessageEmbed()
                        .setColor("DEFAULT")
                        .setTitle('A limpar canal... Aguarda.')
                ],
            });

            if (i.customId === `confirm_delete:${interaction.id}`) {

                let messages = await interaction.channel.messages.fetch();

                while (messages.size !== 0) {
                    for (let message of messages) {

                        try {
                            await message[1].delete();
                        } catch (e) {
                            console.log(e)
                        }
                        await new Promise(r => setTimeout(r, 1000));
                    }

                    messages = await interaction.channel.messages.fetch();
                }

                await i.editReply({
                    components: [],
                    ephemeral: true,
                    embeds: [
                        new MessageEmbed()
                            .setColor("DEFAULT")
                            .setTitle('Canal limpo!')
                    ],
                });
            } else {
                await i.editReply({
                    components: [],
                    embeds: [
                        new MessageEmbed()
                            .setColor("DEFAULT")
                            .setTitle('Cancelado!')
                    ],
                    ephemeral: true,
                });
            }

            collector.stop();
        });

        collector.on('end', async collected => {
            if (collected.size === 0) {
                await interaction.editReply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("DEFAULT")
                            .setTitle('Comando cancelado por falta de confirmação! A eliminar mensagem em 5 segundos.')
                    ],
                    ephemeral: true,
                });

                await interaction
            }
        });
    }
};