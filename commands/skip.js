const distube = require('distube')

module.exports = {
    name: 'skip',
    description: 'skip music',
    cooldown: 1, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        client.distube.skip(message)
    }
}