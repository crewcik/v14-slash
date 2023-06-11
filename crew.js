const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember]});
const crew = require("./crewcik");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v10');

let crewcik = crew.token

client.commands = new Collection()
client.slashcommands = new Collection()
client.commandaliases = new Collection()

const rest = new REST({ version: '10' }).setToken(crewcik);

const log = x => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${x}`) };

const slashcommands = [];
readdirSync('./commands').forEach(async file => {
  const command = await require(`./commands/${file}`);
  slashcommands.push(command.data.toJSON());
  client.slashcommands.set(command.data.name, command);
})

client.on("ready", async () => {
        try {
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: slashcommands },
            );
        } catch (error) {
            console.error(error);
        }
    log(`${client.user.username} Aktif Edildi!`);
})

readdirSync('./events').forEach(async file => {
	const event = await require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
})

client.login(crewcik)
