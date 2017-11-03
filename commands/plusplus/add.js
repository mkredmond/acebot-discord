const { Command } = require('discord.js-commando');
const sqlite3 = require('sqlite3').verbose();  
 

module.exports = class AddCommand extends Command {
	constructor(client) {

		super(client, {
			name: '+',
			group: 'plusplus',
			memberName: '+',
			description: 'Adds +1 to a user\'s Karma',
			examples: ['++ @user'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to grant karma to?',
					type: 'user'
				}
			]
		});
	}

	run(msg, { user }) {  
		if (msg.author.id !== user.id) {

			const db = new sqlite3.Database('./commands/plusplus/database.sqlite');

			db.get("SELECT id, username, channel_id, points FROM scores WHERE id = ?", [user.id], function(err, row) {  
			    if(row === undefined) {
			    	db.run("INSERT INTO scores (id, username, channel_id, points) VALUES (?, ?, ?, ?)", [user.id, user.username, msg.channel.id, 1]);

			       	msg.channel.send(user.username + " has 1 point!")
					  .then(msg => console.log(`Incrementing ${user.username} to 1 point`))
					  .catch(console.error);
			    } else {
		      		db.run("UPDATE scores SET points = ? WHERE id = ? AND channel_id = ?", [row.points + 1, row.id, row.channel_id])

					msg.channel.send(user.username + " has "+ (row.points + 1) + " points!")
					  .then(msg => console.log(`Incrementing ${user.username} by 1 point`))
					  .catch(console.error);
			    }
			});  
			db.close();
		} else {
			msg.reply('You cannot add points to your user, dumbass.')
				.then(msg => console.log(`Sent a reply to ${msg.author}`))
				.catch(console.error);
		}
	}
}