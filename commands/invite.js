const Discord = require('discord.js')

module.exports = {
    name: 'invite',
    description: '',
    cooldown: 60, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        var invLink = client.fetchInvite()
        message.channel.send(invLink.toString())
    }
}