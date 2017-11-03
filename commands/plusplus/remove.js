const { Command } = require('discord.js-commando');
const sqlite3 = require('sqlite3').verbose();  
 

module.exports = class RemoveCommand extends Command {
	constructor(client) {

		super(client, {
			name: '-',
			group: 'plusplus',
			memberName: '-',
			description: 'Removes +1 to a user\'s Karma',
			examples: ['+- @user'],
			args: [
				{
					key: 'user',
					prompt: 'Which user do you want to take karma from?',
					type: 'user'
				}
			]
		});
	}

	run(msg, { user }) {  
		const db = new sqlite3.Database('./commands/plusplus/database.sqlite');

		db.get("SELECT id, username, channel_id, points FROM scores WHERE id = ?", [user.id], function(err, row) {  
		    if(row === undefined) {
		       	msg.channel.send("You can't take points from a ghost.")
		       		.then(msg => console.log(`Decrementing ${user.username} by 1 point`))
				  	.catch(console.error);
		    } else {
	      		db.run("UPDATE scores SET points = ? WHERE id = ? AND channel_id = ?", [row.points - 1, row.id, row.channel_id])
		        console.log('Updating existing user');
				msg.channel.send(user.username + " has "+ (row.points - 1) + " points :(")
				  	.then(msg => console.log(`Decrementing ${user.username} by 1 point`))
				  	.catch(console.error);
		    }
		});  
		db.close();
	}
}