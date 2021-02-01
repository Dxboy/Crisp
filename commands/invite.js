const Discord = require('discord.js')

module.exports = {
    name: 'invite',
    description: '',
    cooldown: 60, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        var invLink = client.fetchInvite()
        message.channel.send({ embed: {
            color: "RANDOM",
            description: "**You can invite me to a server with this link:**\n**https://discord.com/api/oauth2/authorize?client_id=767240098969550888&permissions=0&scope=bot**\n\nMake sure you have the permission **Manage Server** to invite me!"
        }})
    }
}