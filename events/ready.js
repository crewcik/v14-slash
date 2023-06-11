const { ActivityType } = require("discord.js")
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    let activities = [ `Crewcik tarafından kodlandı`, `https://github.com/crewcik`, `Bu bot raxe tarafından desteklenmektedir` ], i = 0;
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: ActivityType.Listening }), 22000);
}};
