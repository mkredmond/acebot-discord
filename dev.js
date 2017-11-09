require('dotenv').config();

const Discord = require("discord.js");
const client = new Discord.Client();
const sql = require("sqlite");
sql.open("./database_dev.sqlite");
    
client.on("ready", () => {
	console.log('Logged in Dev');
	sql.run("CREATE TABLE IF NOT EXISTS scores (userId INTEGER, username TEXT, channelId INTEGER, points INTEGER)").then(() =>{
		console.log('Completed running database setup.');
	}).catch((err) => {
		console.error('Error: ' + err);
	});
});

client.on("message", (message) => {
	if (message.channel.type === "dm") return; // Ignore DM channels.
	if (message.channel.bot) return; // Ignore bots.

	if (message.content.startsWith("!leaders")) {
		sql.all(`SELECT * FROM scores WHERE channelId = ${message.channel.id} ORDER BY points DESC`).then(rows => {
		    let leaderboard = '|User|Points|\n|---|---|';

		    for (var i = 0, len = rows.length; i < len; i++) {
		    	console.log(`Row ${i}: ${rows[i]}`);
				leaderboard += `|${rows[i].username}|${rows[i].points}|\n`;
			}
			message.channel.send(leaderboard);
	  	}).catch((err) => {
		    console.error(err);
	  	});
	}

	/**
	 * Add a point to one or more users
	 * @param  Array of Discord Users
	 * @return Discord Reply
	 */
	if (message.content.indexOf("++") > -1) {
		if (!message.mentions.users) return;

		message.mentions.users.forEach(function(user){
			if (message.author.id === user.id) {
				message.reply('You cannot give yourself points.');
				return;
			} 

			sql.get(`SELECT * FROM scores WHERE userId ="${user.id}" AND channelId = "${message.channel.id}"`).then(row => {
			    if (!row) {
			      	sql.run("INSERT INTO scores (userId, username, channelId, points) VALUES (?, ?, ?, ?)", [user.id, user.username, message.channel.id, 1]);
			     	message.channel.send(`${user.username} has 1 point.`);
			    } else {
			     	sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${user.id} AND channelId = "${message.channel.id}"`);
			     	message.channel.send(`${user.username} has ${row.points + 1} points.`);
			    }
		  	}).catch((err) => {
			    console.error(err);
		  	});
		});
	}
	/**
	 * Remove a point to one or more users
	 * @param  Array of Discord Users
	 * @return Discord Reply
	 */
	if (message.content.indexOf("--") > -1) {
		if (!message.mentions.users) return;

		message.mentions.users.forEach(function(user){
			if (message.author.id === user.id) {
				message.reply('You cannot take points away from yourself.');
				return;
			} 

			sql.get(`SELECT * FROM scores WHERE userId ="${user.id}" AND channelId = "${message.channel.id}"`).then(row => {
			    if (!row) {
			      	sql.run("INSERT INTO scores (userId, username, channelId, points) VALUES (?, ?, ?, ?)", [user.id, user.username, message.channel.id, 1]);
			     	message.channel.send(`${user.username} has 1 point.`);
			    } else {
			     	sql.run(`UPDATE scores SET points = ${row.points - 1} WHERE userId = ${user.id} AND channelId = "${message.channel.id}"`);
			     	message.channel.send(`${user.username} has ${row.points - 1} points.`);
			    }
		  	}).catch((err) => {
			    console.error(err);
		  	});
		});
	}

});

client.login(process.env.LOGIN_TOKEN);

