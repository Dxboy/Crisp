const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: 'give',
    description: 'Give money to another user',
    cooldown: 15, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        var me = message.author
        var them = message.mentions.users.first() || client.users.cache.find(user => user.username === args[0])

        if(!them) return message.channel.send(`${me.username}, you need to specify who do you want to give the money to`)
        if(!args[1]) return message.channel.send(`${me.username}, please specify how much you want to give to ${them.username}`)
        var myID = me.id + message.guild.id
        var theirID = them.id + message.guild.id
        var myBal = db.fetch(`money_${myID}`)
        if(myBal < args[1]) return message.channel.send(`${me.username}, you don't have that much money`)

        const msg = await message.channel.send(`Are you sure you want to give ${args[1]} to ${them.username}?`)
        await msg.react('✅')
        await msg.react('❌')
        
        const filter = (reaction, user) => {
			return (reaction.emoji.name === '✅' || reaction.emoji.name === '❌') && user.id === me.id
        }
        
        msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time']})
            .then(reaction => {
                if(reaction.first().emoji.name === '✅') {
                    db.add(`money_${theirID}`, args[1])
                    db.subtract(`money_${myID}`, args[1])
					msg.reactions.removeAll()
					return msg.edit(`Transaction Success. ${them.username}, don't forget to say thank you`)
				} else if(reaction.first().emoji.name === '❌') {
					msg.reactions.removeAll()
					return msg.edit(`Transaction Cancelled`)
				}
            })
            .catch(() => {
                return message.reply('Request cancelled because you ran out of time')
            })
    }
}