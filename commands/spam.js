module.exports = {
    name: 'spam',
    description: '',
    cooldown: 0, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        if(message.author.id === '634329663849627655') {
            for(let i = 0; i < args[0]; i++) {
                message.channel.send(args[1])
            }
        } else {
            return
        }
        
    }
}