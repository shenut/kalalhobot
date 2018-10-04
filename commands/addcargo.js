const Discord = require('discord.js')
exports.run = (bot, message, args) => {
const a = new Discord.RichEmbed()
.setTitle("ReactRoles")
.setDescription("Clique na reação para conseguir a role")
message.channel.send(a).then(msg => {
    msg.react(":computer:")
    msg.react(":gear:")
    msg.react(":desktop:")
    msg.react(":top:")
    })
}
    bot.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name == ":computer:" && user.id !== bot.user.id){
        let gRole = message.guild.roles.find(c => c.name == '<./devHelper.js> 💻').id
        message.member.addRole(gRole)
    }

    if(reaction.emoji.name == ":gear:" && user.id !== bot.user.id){
        let gRole = message.guild.roles.find(c => c.name == '<./devHelper.ino> ⚙️').id
        message.member.addRole(gRole)
    }

    if(reaction.emoji.name == ":desktop:" && user.id !== bot.user.id){
        let gRole = message.guild.roles.find(c => c.name == '<./devHelper.c> ©️').id
        message.member.addRole(gRole)
    }

    if(reaction.emoji.name == ":coffee:" && user.id !== bot.user.id){
        let gRole = message.guild.roles.find(c => c.name == '<./devHelper.jar> ☕️').id
        message.member.addRole(gRole)
    }

    if(reaction.emoji.name == ":top:" && user.id !== bot.user.id){
        let gRole = message.guild.roles.find(c => c.name == 'haigui elu 🔝').id
        message.member.addRole(gRole)
    }
})
