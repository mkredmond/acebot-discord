const { Command } = require('discord.js-commando');
const sqlite3 = require('sqlite3').verbose();  
 
module.exports = class StatusCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leaders',
			group: 'plusplus',
			memberName: 'leaders',
			description: 'Returns leaderboard for channel',
			examples: ['+leaders']
		});
	}

	run(msg) {  
		// console.log(msg);
		const db = new sqlite3.Database('./commands/plusplus/database.sqlite');

		db.all("SELECT username, points FROM scores WHERE channel_id = ? ORDER BY points DESC",[msg.channel.id], function(err, rows) { 
			if (rows !== []) {
				var leaderboard = "";
				for (var i = 0; i < rows.length; i++) {
				   leaderboard += rows[i].username + " | " + rows[i].points + "\n";
				}
				msg.reply(`The scores have been tallied...\n\n${leaderboard}`)
					.then(msgSent => console.log(`${msg.message.author.username} requested the leaderboard`))
					.catch(console.error);
			} else {
				msg.reply(`Looks like there are no entries yet in this channel.`)
					.then(msgSent => console.log(`No entries located in channel: ${msg.message.channel.id}`))
					.catch(console.error);
			} 
		});

		db.close();
	}
}