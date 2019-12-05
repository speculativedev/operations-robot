# operations-robot
DevOps Bot for Diswcord

## Depedencies

* apt-get install redis-server

* npm install redis
* npm install discord-akairo
* npm install discord.js

* open up bot.js and configure appropriately. (i.e. Going to discordapp.com -> applications and grabbing the info there + copying ids out of the discord app)
* Create the sudo role to grant permissions to use the bot's default commands. 
   * You can adjust the ACL by adjusting the commands/ directory for roles specific to your situation.

## FAQ

**How do I invite the bot to the server?**
* https://discordapp.com/oauth2/authorize?client_id=<bot-client-id>&scope=bot

**How do I setup GitHub webhooks?**
* Like a normal Discord Webhook and add /github to the end.

**How do I manually test pub/sub functionality?**
* redis-cli -> PUBLISH operations-robot-msgs test236