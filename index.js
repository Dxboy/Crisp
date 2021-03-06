const fs = require('fs');
const Discord = require('discord.js');
const distube = require('distube')
const { prefix } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

client.distube = new distube(client, { searchSongs: false, emitNewSongOnly: true });

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({
		status: 'online',
		activity: {
			name: 'WITH YOUR MOM',
			type: 'PLAYING',
		}
	})
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('You can not do this!');
		}
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	
});
const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
	.on("addSong", (message, queue, song) => message.channel.send({ embed: {
		color: "RED",
		author: {
			name: 'Added to queue',
			icon: song.user.avatarURL()
		},
		title: `${song.name}`,
		url: `${song.url}`,
		description: `**Duration**\n${song.formattedDuration}`,
		footer: `Requested by - ${song.user.tag}`
	}}))
	.on("addList", (message, queue, playlist) => message.channel.send({ embed: {
		color: "RED",
		author: {
			name: 'Added to queue',
			icon: song.user.avatarURL()
		},
		title: `${song.name}`,
		url: `${song.url}`,
		description: `**Duration**\n${song.formattedDuration}`,
		footer: `Requested by - ${song.user.tag}`
	}}))

client.login(process.env.token);

