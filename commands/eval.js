const Discord = module.require("discord.js")
const discord = module.require('discord.js')
const client = new Discord.Client();
const bot = new Discord.Client();

module.exports.run = async (bot, message, args) => {
    if(message.author.id !== '394638597439094795') return message.channel.send("Only the owner can use this command!");
    function clean(text) {
      if (typeof(text) === "string")
        return text.replace(/'/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
      else
          return text;
    }
  
  console.log(`\n${message.author.username}#${message.author.discriminator} Used .Eval Command On ${message.guild.name}`)
    let argresult = args.join(' ');
    if (message.author.id !==  '394638597439094795') {
           // Check if user have Permissions to use the command
          return; // Returns the code so the rest doesn't run
        }
        if (!argresult) {
          return message.channel.send("Please Specify a Code To Run!");
        }
        if (argresult === 'bot.token') return message.channel.send("I DONT THINK SO MOTHERFUCKER")
        if (argresult === 'client.token') return message.channel.send("I DONT THINK SO MOTHERFUCKER")
  
        try {
  
          var evaled = eval(argresult);
  
          if (typeof evaled !== "string")
         evaled = require("util").inspect(evaled);

  
          let embed = new Discord.RichEmbed()
          .addField(`${bot.user.username} - JavaScript Eval Success:`, `** **`)
          .addField(":inbox_tray: **INPUT**", "```" + args.join(" ") + "```")
          .addField(":outbox_tray: **OUTPUT**", "```" + clean(evaled) + "```")
          .setColor(0xFF5733)
          .setFooter(message.createdAt, message.author.avatarURL)
          message.channel.send({embed})
  
        } catch (err){
  
          message.channel.send(new Discord.RichEmbed()
          .addField(`${bot.user.username} - JavaScript Eval Error:`, "There Was a Problem With The Code That You Are Trying To Run!")
          .addField(":no_entry: ERROR", "```" + clean(err) + "```")
          .setColor(0xFF5733)
          .setFooter(message.createdAt, message.author.avatarURL))
          
              .catch( error => message.channel.send(`**ERROR:** ${error.message}`))
        }

}

module.exports.help = {
    name: 'eval'
}




