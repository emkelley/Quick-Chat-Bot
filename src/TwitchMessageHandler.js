const fs = require('fs');
const ChatCommand = require('./ChatCommand');
module.exports = class TwitchMessageHandler {
    commands = {};
    constructor(dir) {
        if (!dir) {
            throw new Error(
                'Invalid parameters. You must include a commands directory to create a TwitchMessageHandler'
            );
        }
        try {
            const commandFiles = fs.readdirSync(dir);
            commandFiles
                .filter((commandFile) => commandFile.endsWith('.js'))
                .forEach((commandFile) => {
                    const commandConfig = require(`${dir}/${commandFile}`);
                    commandConfig.text =
                        commandConfig.text || `!${commandFile.slice(0, -3)}`;
                    try {
                        const chatCommand = new ChatCommand(commandConfig);
                        this.commands[chatCommand.text] = chatCommand;
                    } catch (err) {
                        console.error(err);
                        return;
                    }
                });
        } catch (err) {
            console.error(err);
        }
    }

    handleMessage = async (channel, tags, message, self, client) => {
        if (self) return;
        //Check for Reward Redemption
        const username = tags.username;
        const rewardId = tags['custom-reward-id'];
        if (rewardId && this.commands[rewardId]) {
            this.commands[rewardId].tryUseCommand(
                username,
                channel,
                tags,
                message,
                self,
                client
            );
        }
        //Check for Command
        const incomingCommand = message.split(' ')[0];
        if (this.commands[incomingCommand]) {
            this.commands[incomingCommand].tryUseCommand(
                username,
                channel,
                tags,
                message,
                self,
                client
            );
        }
    };
};
