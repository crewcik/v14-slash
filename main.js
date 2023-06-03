const crew = require('discord.js')
const crewconfig = require('./crew.json')

let token = crewconfig.token;

crew.login(token)
