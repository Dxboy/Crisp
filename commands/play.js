const distube = require('distube')

module.exports = {
    name: 'play',
    description: 'play music',
    cooldown: 1, //optional
    aliases: ['p'], //optional...leave the array empty
    async execute(client, message, args) {
        client.distube.play(message, args.join(' '))
    }
}