const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: 'gacha',
    description: 'GO WHALE',
    cooldown: 0, //optional
    aliases: [], //optional...leave the array empty
    async execute(client, message, args) {
        var userID = message.author.id + message.guild.id
        var pull = db.fetch(`pull_${userID}`)
        var guarantee = []
        var char5 = ['Keqing', 'Diluc', 'Qiqi', 'Jean', 'Mona']
        var char4 = [
                    'Diona',
                    'Xinyan',
                    'Xingqiu',
                    'Xiangling',
                    'Chongyun', 
                    'Amber', 
                    'Kaeya', 
                    'Razor', 
                    'Lisa', 
                    'Sucrose', 
                    'Bennet',
                    'Noelle',
                    'Beidou',
                    'Barbara',
                    'Fischl',
                    'Ningguang'
                ]
        var weap3 = [
                    'Debate Club',
                    'Thrilling Tales of Dragon Slayer',
                    'Bloodtained Sword',
                    'Black Tassel',
                    'Ferrous Sword',
                    'Skyrider Sword',
                    'Sharpshooter\'s Oath',
                    'Magic Guide',
                    'Raven Bow',
                    'Harbinger of Dawn',
                    'Slingshot',
                    'Emerald Orb'
                    ]
        if(args[0] === '10') {
            var i = 0
            var firstResult = Math.floor(Math.random() * char4.length)
            while (i < 9) {
                var result = Math.floor(Math.random() * 1000)
                if(result <= 6) {
                    var charResult0 = Math.floor(Math.random() * char5.length)
                    message.channel.send(char5[charResult0])
                    db.subtract(`pull_${message.author.id + message.guild.id}`, pull)
                } else if(result <= 51 && result >= 6) {
                    var charResult1 = Math.floor(Math.random() * char4.length)
                    var charResult0 = Math.floor(Math.random() * char5.length)
                    if(pull === 90) {
                        db.subtract(`pull_${message.author.id + message.guild.id}`, pull)
                        return message.channel.send(char5[charResult0])
                    }
                    message.channel.send(char4[charResult1])
                    db.add(`pull_${userID}`, 1)
                } else {
                    var weapResult = Math.floor(Math.random() * weap3.length)
                    var charResult0 = Math.floor(Math.random() * char5.length)
                    if(pull === 90) {
                        db.subtract(`pull_${message.author.id + message.guild.id}`, pull)
                        return message.channel.send(char5[charResult0])
                    }
                    message.channel.send(weap3[weapResult])
                    db.add(`pull_${userID}`, 1)
                }
                i++
            }
            
            message.channel.send(char4[firstResult])
        }else if(!args[0]) {
            var result = Math.floor(Math.random() * 1000)
            if(result <= 6) {
                var charResult0 = Math.floor(Math.random() * char5.length)
                message.channel.send(char5[charResult0])
                db.subtract(`pull_${message.author.id + message.guild.id}`, pull)
            } else if(result <= 51 && result >= 6) {
                var charResult1 = Math.floor(Math.random() * char4.length)
                var charResult0 = Math.floor(Math.random() * char5.length)
                if(pull === 90) {
                    db.subtract(`pull_${message.author.id + message.guild.id}`, pull)
                    return message.channel.send(char5[charResult0])
                }
                message.channel.send(char4[charResult1])
            } else {
                var weapResult = Math.floor(Math.random() * weap3.length)
                var charResult0 = Math.floor(Math.random() * char5.length)
                if(pull === 90) {
                    db.subtract(`pull_${message.author.id + message.guild.id}`, pull)
                    return message.channel.send(char5[charResult0])
                }
                message.channel.send(weap3[weapResult])
            }
            db.add(`pull_${userID}`, 1)
        }
    }
}