const distube = require('distube') 

module.exports = {
    name: 'stop',
    description: '',
    cooldown: 1, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        try {
            client.distube.stop(message)
            message.channel.send('Song stopped')
        } catch (error) {
            message.channel.send(error.toString())
        }
    }
}