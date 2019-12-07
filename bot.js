var fs = require('fs');

// begin configuration
const default_channel_id = fs.readFileSync('/opt/secrets/operations-robot-channel', 'utf8').trim();
const secret = fs.readFileSync('/opt/secrets/operations-robot', 'utf8').trim();
const owner = fs.readFileSync('/opt/secrets/operations-robot-owner', 'utf8').trim();
const uptimerobotkey = fs.readFileSync('/opt/secrets/uptimerobot', 'utf8').trim();
// end configuration

// Var Init
var default_channel = ''; // leave empty
// End Var Init

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


// UptimeRobot Init
function UptimeRobot() {
    if(uptimerobotkey == '') // not initalized
        return;


    const fetch = require("node-fetch");
    var options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
            format: 'json',
            api_key: uptimerobotkey
        })
    };

    fetch('https://api.uptimerobot.com/v2/getMonitors', options)
    .then(res => res.json())
    .then(json => {
        json.monitors.forEach(monitor => {
            //console.log(monitor.friendly_name);
            if(monitor.status>2) {
                default_channel.send(monitor.friendly_name+" is offline per UptimeRobot.");
            }
        });
    })
    .catch((error) => {
        console.error(error);
        default_channel.send("UptimeRobot - Error Fetching Service Status.");
    });
    setTimeout(UptimeRobot, 60000);
}
setTimeout(UptimeRobot, 60000);
// End UptimeRobot Init
