const distube = require('distube') 

module.exports = {
    name: 'resume',
    description: '',
    cooldown: 1, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        if(client.distube.resume(message)) {
            client.distube.resume(message)
        } else if (client.distube.isPlaying) {
            message.channel.send('Song is still playing')
        }
    }
}