const db = require('quick.db')
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'balance',
    description: 'This command shows balance in both your wallet and bank account',
    cooldown: 10,
    aliases: ['bal'],
    async execute(client, message, args) {
        var user = message.mentions.users.first() || client.users.cache.find(user => user.username === args[0]) || message.author;
        var userID = user.id + message.guild.id;

        var bal = db.fetch(`money_${userID}`)
        if(bal === null) bal = 0;

        var bank = db.fetch(`bank_${userID}`)
        if(bank === null) bank = 0;

        var embed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`**${user.username}\'s Balance**\n\n**Wallet:**\n${bal}\n**Bank:**\n${bank}`)
        
        message.channel.send(embed)
    }
}