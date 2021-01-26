const db = require('quick.db') 

module.exports = {
    name: 'checkpity',
    description: '',
    cooldown: 0.1, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        message.channel.send(db.fetch(`pull_${message.author.id + message.guild.id}`))
    }
}