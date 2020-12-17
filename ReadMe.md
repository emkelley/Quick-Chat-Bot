# Quick Chat Bot

Easily create chat bots for different platforms with some nice built in features.

- easy command creation/imports
- support for user and global cooldown

This package currently supports the following platforms for handling chat commands.

- Twitch

## Configuring a Twitch Chat Bot

You'll need 4 properties for creating your QuickTwitchBot.

1. twitch username - the username you are connecting with
2. twitch password - the password/token you are connecting with (you can find/generate your token [here](https://twitchapps.com/tmi/))
3. twitch channel - the channel you are connecting to (this can be the same as your username)
4. commands directory - the directory where your command files are stored

With those credentials in place, you can create your Twitch bot.
   
```javascript
require('dotenv').config();
const { QuickTwitchBot } = require('quick-chat-bot');
const path = require('path');
const bot = new QuickTwitchBot({
    username: <YOUR_USERNAME>, //ex. 'jamesqquick'
    password: <YOUR_PASSWORD>,
    channel: <TWITCH_CHANNEL_NAME>, //ex. 'jamesqquick'
    commandsDir: path.join(__dirname, <YOUR_COMMANDS_DIR>), // ex. 'commands'
});
bot.connect();
```

### Create a Twitch Chat Bot Command

Commands will be parsed automatically by the TwitchChatBot client by searching for `.js` files inside of the directory specified by the `commandsDir` property. These command files can have the following properties.

- text (optional) - the text that is used for the command. If no `text` property is included, the name of the file will be used by default
- callback (required) - callback function to be called when command is triggered
- userCooldown (optional) - amount of time (in seconds) that the user will have to wait before sending the same command again
- globalCooldown (optional) - amount of time (in seconds) that a any user will have to wait before sending the same command again

```javascript
//if a user sends a chat message `!ping` the bot will respond back with `pong`
module.exports = {
    text: '!ping',
    callback: (channel, tags, message, self, client) => {
        client.say(channel, 'pong');
    },
};
```
