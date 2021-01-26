const db = require('quick.db')
const {MessageEmbed} = require('discord.js')




module.exports = {
    name: 'work',
    description: 'This command let you work and get money to buy stuff',
    cooldown: 0,
    aliases: [],
    async execute(client, message, args) {
        
        if(message.author.id === '634329663849627655') {
            this.cooldown = 1
        } else {
            this.cooldown = 30
        }
        var work = ['Waiter', 'Chef', 'Nothing']
        const userID = message.author.id + message.guild.id;
        var result = Math.floor(Math.random() * work.length)
        var earned = Math.floor(Math.random() * 250)
        if(work[result] === 'Nothing') return message.channel.send(`${message.author.username}, you don\'t even work... What a waste of time`)
        var workEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setDescription(`**${message.author.username}\'s Work Result**\n\n You worked as \`${work[result]}\` and earned \`${earned}\``)

        message.channel.send(workEmbed)
        db.add(`money_${userID}`, earned)
    }
}