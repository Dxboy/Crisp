const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    description: 'Shows bot latency',
    cooldown: 5,
    aliases: [],
    execute(client, message, args) {
        const latency = Date.now() - message.createdTimestamp;
        const APIlatency = Math.round(client.ws.ping);

        const Embed = new MessageEmbed()
        .setColor('BLUE')
        .setDescription(`**Bot latency** - ${latency}\n**API Latency** - ${APIlatency}`)
        message.channel.send(Embed)
    }
}