const distube = require('distube')

module.exports = {
    name: 'play',
    description: 'play music',
    cooldown: 1, //optional
    aliases: ['p'], //optional...leave the array empty
    async execute(client, message, args) {
        client.distube.play(message, args.join(' '))
        const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
	    client.distube
    	    .on("playSong", (message, queue, song) => message.channel.send(
    	        `${client.emotes.play} | Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}\n${status(queue)}`
    	    ))
    }
}