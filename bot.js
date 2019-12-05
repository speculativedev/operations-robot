var fs = require('fs');

// begin configuration
var default_channel = '';
var default_channel_id = fs.readFileSync('/opt/secrets/operations-robot-channel', 'utf8').trim();
var secret = fs.readFileSync('/opt/secrets/operations-robot', 'utf8').trim();
var owner = fs.readFileSync('/opt/secrets/operations-robot-owner', 'utf8').trim();
// end configuration

// Akairo Client Init
const { AkairoClient } = require('discord-akairo');
const client = new AkairoClient({
    ownerID: owner,
    prefix: '!',
    commandDirectory: './commands/'
}, {
    disableEveryone: false
});

client.login(secret);

client.on("ready", () => {
	console.log("My Owner Is: " + client.ownerID);
	console.log("My Default Channel Is: " + default_channel_id);

	default_channel = client.channels.get(default_channel_id);

    client.user.setPresence({
        game: { 
            name: 'DevOps',
            type: ''
        },
        status: 'online'
    })

	//client.users.get(client.ownerID).send("Operations Robot is online.");
	default_channel.send("Operations Robot is online.");
});
// End Akairo Client Init

// Redis Init
var redis = require("redis");
var subscriber = redis.createClient();
subscriber.on("message", function (channel, message) {
	default_channel.send(message);
});
subscriber.subscribe("operations-robot-msgs");
// End Redis Init