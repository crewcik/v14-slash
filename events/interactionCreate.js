const { InteractionType } = require("discord.js");
const crew = require('../crewcik')

module.exports = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        let client = interaction.client;
        if (interaction.type == InteractionType.ApplicationCommand) {
            if (interaction.user.bot) return;
            try {
                const command = client.slashcommands.get(interaction.commandName)
                command.run(client, interaction)
            } catch (e) {
                console.error(e)
                interaction.reply({ content: `Komutta bir hata var lütfen <@&${crew.crew}> ile iletişime geçn.`, ephemeral: true })
            }
        }
    }
}
