var fs = require('fs');

var owner = fs.readFileSync('/opt/secrets/operations-robot-owner', 'utf8');
const { AkairoClient } = require('discord-akairo');
const client = new AkairoClient({
    ownerID: owner.trim(),
    prefix: '!',
    commandDirectory: './commands/'
}, {
    disableEveryone: false
});

var secret = fs.readFileSync('/opt/secrets/operations-robot', 'utf8');

client.login(secret.trim());

client.on("ready", () => {
	console.log("My Owner Is:" + client.ownerID);

    client.user.setPresence({
        game: { 
            name: 'DevOps',
            type: ''
        },
        status: 'online'
    })

	client.users.get(client.ownerID).send("Operations Robot is online.");
});



