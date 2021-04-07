const distube = require('distube')

module.exports = {
    name: 'autojoin',
    description: '',
    cooldown: 1, //optional
    aliases: ['atj'], //optional...leave the array empty
    async execute(client, message, args) {
        const channel = client.channels.cache.get("ChannelIDhere");
        if (!channel) return console.error("The channel does not exist!");
        channel.join().then(connection => {
            // Yay, it worked!
            console.log("Successfully connected.");
        }).catch(e => {

            // Oh no, it errored! Let's log it to console :)
            console.error(e);
        });
    }
}