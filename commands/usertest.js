const Discord = require('discord.js')

module.exports = {
    name: 'uid',
    description: '', //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        message.channel.send(client.users.cache.find(user => user.username === args[0]).id);
    }
}