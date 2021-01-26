module.exports = {
    name: 'queue',
    description: 'show queue',
    cooldown: 1, //optional
    aliases: ['q'], //optional...leave the array empty
    async execute(client, message, args) {
        let queue = client.distube.getQueue(message);
        message.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }
}