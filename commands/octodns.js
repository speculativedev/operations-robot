const { Command } = require('discord-akairo');

class DNSCommand extends Command {
    constructor() {
        super('deploy.dns', {
            aliases: ['deploy.dns']
        });
    }

    userPermissions(message) {
        return message.member.roles.exists(role => role.name === 'sudo');
    }

    exec(message) {
        message.reply("Starting deployment of OctoDNS");
        var exec = require('child_process').exec, child;
        exec('cd /home/kg/octodns && ./deploy.sh',
        function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            return message.reply('Deployed OctoDNS!');
        });
    }
}

module.exports = DNSCommand;
