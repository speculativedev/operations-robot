const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor() {
        super('deploy.kengodwin.com', {
            aliases: ['deploy.kengodwin.com']
        });
    }

    userPermissions(message) {
        return message.member.roles.exists(role => role.name === 'sudo');
    }

    exec(message) {
        message.reply("Starting deployment of KenGodwin.com");
        var exec = require('child_process').exec, child;
        exec('cd /home/kg/kengodwin.com && ./upload.php',
        function (error, stdout, stderr) {
            console.log(stdout);
            console.log(stderr);
            return message.reply('Deployed to KenGodwin.com!');
        });
    }
}

module.exports = PingCommand;
