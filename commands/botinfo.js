const Discord = require('discord.js')

module.exports = {
    name: 'botinfo',
    description: 'Info about the bot', //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        const attachment = new Discord.MessageAttachment(message.author.avatarURL({ format: 'png', dynamic: true, size: 2048}))
        const embed = new Discord.MessageEmbed()
            .setImage(client.user.avatarURL)
            .setDescription('hi')
        message.channel.send(attachment)
    }
        
}