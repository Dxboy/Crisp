const Discord = require('discord.js')

module.exports = {
    name: 'playing',
    description: '',
    cooldown: 1, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        var input = args.toString()
        var after = input.replace(/,/g, ' ')
        if(message.author.id === '634329663849627655') {
            client.user.setPresence({
                status: 'online',
                activity: {
                    name: after,
                    type: 'PLAYING',
                }
            })
        }else {
            return
        }
    }
}