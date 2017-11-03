/*jshint esversion: 6 */
require('dotenv').config();

// const CommandoClient = require('discord.js-commando').CommandoClient
const { CommandoClient } = require('discord.js-commando'); 
const path = require('path');
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./commands/plusplus/database.sqlite');
    db.run("CREATE TABLE IF NOT EXISTS scores (id INTEGER, username TEXT, channel_id INTEGER, points INTEGER)");
    db.close()
const acebot = new CommandoClient({
    commandPrefix: process.env.PREFIX,
    owner: process.env.OWNER_ID,
    disableEveryone: true
});

acebot.registry
    .registerDefaultTypes()
    .registerGroups([
        ['plusplus', 'plusplus']
    ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, 'commands'));

acebot.on('ready', function(){
    console.log('Logged in!');
    acebot.user.setGame('PlusPlus');
});

acebot.login(process.env.LOGIN_TOKEN);
