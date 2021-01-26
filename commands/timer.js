const ms = require('parse-ms')
const db = require('quick.db')
module.exports = {
    name: 'timer',
    description: 'set timer', //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        var input = parseInt(args[0]) * 1000
        function timer() {
            message.reply('The timer has finised')
        }
        setTimeout(timer, input)
    }
}