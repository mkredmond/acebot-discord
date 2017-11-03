const { Command } = require('discord.js-commando');
const sqlite3 = require('sqlite3').verbose();  
 

module.exports = class StatusCommand extends Command {
	constructor(client) {

		super(client, {
			name: 'status',
			group: 'plusplus',
			memberName: 'status',
			description: 'Retrieves current Karma levels',
			examples: ['+status']
		});
	}

	run(msg) {  
		const db = new sqlite3.Database('./commands/plusplus/database.sqlite');

		db.get("SELECT id, points FROM scores WHERE id = ? AND channel_id = ?", [msg.author.id, msg.channel.id], function(err, row) { 
			if(row !== undefined) {
				msg.reply("You have "+ row.points + " points!")
					.then(msg => console.log(`Listing the karma for ${msg.author.username}`))
					.catch(console.error);
			} else {
				msg.reply("I ain't found shit!")
					.then(msg => console.log(`No karma found for  ${msg.author.username}`))
					.catch(console.error);
			}
			
		});  

		db.close();
	}
}