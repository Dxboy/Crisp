const distube = require('distube')

module.exports = {
    name: 'autoplay',
    description: '',
    cooldown: 1, //optional
    aliases: ['ap'], //optional...leave the array empty
    async execute(client, message, args) {
        try {
            let mode = client.distube.toggleAutoplay(message);
            message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
        } catch (error) {
            message.channel.send(error.toString())
        }
        
    }
}