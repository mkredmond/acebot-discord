/*jshint esversion: 6 */
(function() {
    "use strict";
    // this function is strict...
}());

require('dotenv').config();
var request = require('request');
var giphy = require('giphy-api')();

const Discord = require('discord.js');
const acebot = new Discord.Client();
const config = require("./config.json");
const prefix = config.prefix;

//Notify when ready
acebot.on('ready', () => {
    console.log('I am ready, gimmie some commands!!');
});

//Message handler
acebot.on('message', message => {
    if (message.author.bot)
        return;
    if (!message.content.startsWith(prefix))
        return;
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length).toLowerCase();
    console.log(command);

    //Add numbas - do maths
    let args = message.content.split(" ").slice(1);
    if (command === "add") {
        let numArray = args.map(n => parseInt(n));
        let total = numArray.reduce((p, c) => p + c);
        message.channel.sendMessage(total).catch(console.error);
    }
    //Help
    if (command === 'helpme') {
        message.reply("help? You don't need help.").catch(console.error);
    }
    //Ping - Pong
    if (command === 'pong') {
        message.channel.sendMessage('ping').catch(console.error);
    }
    //Foo - Bar - locked down to Admin Role only
    if (command === 'foo') {
        let AdminRole = message.guild.roles.find("name", "Admin");
        if (message.member.roles.has(AdminRole.id)) {
            message.channel.sendMessage('bar!').catch(console.error);
        } else {
            message.channel.sendMessage(`Hah, you noob. You don't have access to that command!`).catch(console.error);
        }
    }
    //Bitcoin
    if (command === 'bitcoin') {
        request('https://blockchain.info/ticker', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body); //Show output in JSON
                var result = JSON.parse(body);
                console.log(body); //Parse JSON Result
                var USD = result.USD.last; //Set USD variable to the latest USD bitcoin price
                console.log(USD); //Show price in console
                message.reply(`the current Bitcoin market price is: $ ${USD} USD`).catch(console.error); //Send price to user that requested price
            }
        });
    }
    //Random goat gif
    if (command === 'goat') {
        // Search with options using callback
        giphy.random({
            tag: 'goat'
        }, function(err, res) {
            // Res contains gif data!
            var goatURL = res.data.image_url;
            message.channel.sendFile(goatURL, '', ':goat: | **Here is your random goat:**').catch(console.error);
        });
    }
    //Random cat gif
    if (command === 'kitten') {
        // Search with options using callback
        giphy.random({
            tag: 'kitten'
        }, function(err, res) {
            // Res contains gif data!
            var kittenURL = res.data.image_url;
            message.channel.sendFile(kittenURL, '', ':cat2: | **Here is your random kitten:**').catch(console.error);
        });
    }
    //Steve Brule - Bringo Gif
    if (command === 'bringo') {
        message.channel.sendFile('https://media.giphy.com/media/xLsaBMK6Mg8DK/giphy.gif').catch(console.error);
    }
    //Triggered Gif
    if (command === 'triggered') {
        message.channel.sendFile('https://media.giphy.com/media/vk7VesvyZEwuI/giphy.gif').catch(console.error);
    }
    //James Franco Bow Gif
    if (command === 'bow') {
        message.channel.sendFile('assets/bow.gif').catch(console.error);
    }




}); //End message handler

acebot.login(process.env.LOGIN_TOKEN);
