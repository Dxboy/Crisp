const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'withdraw',
    description: 'Withdraw money from your bank',
    cooldown: 10, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        var userID = message.author.id + message.guild.id
        var bank = db.fetch(`bank_${userID}`)
        if(!args.length) return message.channel.send('You ain\'t gonna withdraw anything, m8?')
        if(args[0] > bank) return message.channel.send('Bruh you think you have that much money in your bank?')

        db.add(`money_${userID}`, args[0])
        db.subtract(`bank_${userID}`, args[0])
        var bal = db.fetch(`money_${userID}`)
        var withdrawEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**You have withdrawn \`${args[0]}\`**.\n\n**Your balance**\n$${bal}`)

        message.channel.send(withdrawEmbed)
    }
}