const Discord = require('discord.js')

module.exports = {
    name: 'forcelogout',
    description: '',
    cooldown: 0.1, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        if(message.author.id === '634329663849627655') {
            client.destroy()
        } else {
            message.channel.send('Request denied')
        }
    }
}