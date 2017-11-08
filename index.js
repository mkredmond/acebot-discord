const sqlite3 = require('sqlite3').verbose();  
const db = new sqlite3.Database('./commands/plusplus/database.sqlite'); 

db.all('SELECT id, username, channel_id, points FROM scores ORDER BY points DESC', function(err, row) {
  console.log(row);
});
  
db.close();  