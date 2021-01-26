const distube = require('distube') 

module.exports = {
    name: 'pause',
    description: '',
    cooldown: 1, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        if(client.distube.isPlaying) {
            client.distube.pause(message)
        } else if(client.distube.resume(message)) {
            message.channel.send('Song is already paused')
        }
    }
}