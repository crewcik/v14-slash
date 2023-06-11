const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Pong!"),
    run: async (client, interaction) => {
        interaction.reply(`Pong\nBu kod https://github.com/crewcik tarafından kodlandı.`)
    }
};
