const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'deposit',
    description: 'Put your money in the bank',
    cooldown: 10, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        var userID = message.author.id + message.guild.id 
        var bal = db.fetch(`money_${userID}`)
        if(!args.length) return message.channel.send('Please put in the value of how much you want to deposit')
        if(args[0] > bal) return message.channel.send('You don\'t have that much money to deposit')

        db.add(`bank_${userID}`, args[0])
        db.subtract(`money_${userID}`, args[0])
        var bank = db.fetch(`bank_${userID}`)
        var depositEmbed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(`**You have deposited \`${args[0]}\` into your bank account**.\n\n**Your bank balance**\n$${bank}`)

        message.channel.send(depositEmbed)

        
    }
}