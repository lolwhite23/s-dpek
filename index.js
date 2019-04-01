const discord = require('discord.js');
const message = require('./handlers/message');
const utils = require('./global/utils');
const bot = new discord.Client();
const client = new discord.Client();
const fs = require("fs");
const ms = require("ms");
const botconfig = require('./settiings/config.json')
const db = require('quick.db');

require('./global/functions')(bot, utils, botconfig);

bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();
message.message(bot, utils, botconfig, discord);





bot.on('ready', function() {

  console.log(`${bot.user.username} is online!`)
  setInterval(async () => {
const statuslist = [
  "TAKEN OVER",
  `ASIJFDoijaef`,
  `Taken Over`
];
const random = Math.floor(Math.random() * statuslist.length);

try {
  await bot.user.setPresence({
    game: {
      name: `${statuslist[random]}`,
      type: "WATCHING"
      //url: 'https://www.twitch.tv/spokloo'
    },
    status: "online"
  });
} catch (error) {
  console.error(error);
}
}, 10000);
});

bot.on('guildMemberAdd', member => {
  member.guild.channels.get('442504610066857985').setName(`Total Users: ${member.guild.memberCount}`);
  if(member.bot) return;
    let role = member.guild.roles.find("name", "Members");
    member.addRole(role).catch(console.error);
  let welome = new discord.RichEmbed()
  .setAuthor('Welcome!', bot.user.displayAvatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .addField(`Welcome ${member.user.tag} to the server!`, '_ _')
  .addField("Total members:", `${member.guild.memberCount}`)
  .setColor("#2CDD19")
  .setFooter("Covalia | Logs")
  .setTimestamp()
 let welcomeChannel = member.guild.channels.find('name', 'welcome');
  welcomeChannel.send(welome)

  let logChannel = member.guild.channels.find('name', 'mod-log');

    let logEmbed1 = new discord.RichEmbed()
    .setAuthor("Member joined", bot.user.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL)
    .addField(member.user.username + " Has joined the server.", '_ _')
    .addField(`ID: ${member.user.id}`, '_ _')
    .addField(`Tag: #${member.user.discriminator}`, '_ _')
    .addField("Total members:", `${member.guild.memberCount}`)
    .setColor("#2CDD19")
    .setFooter("Covalia | Logs")
    .setTimestamp()
    logChannel.send(logEmbed1);
  })

  bot.on('guildMemberRemove', member => {
    
    member.guild.channels.get('442504610066857985').setName(`Total Users: ${member.guild.memberCount}`);
    
      let leave = new discord.RichEmbed()
  .setAuthor('Goodbye!', bot.user.displayAvatarURL)
  .setThumbnail(member.user.displayAvatarURL)
  .addField(`${member.user.tag} has left the server, we will miss you!`, '_ _')
  .addField("Total members:", `${member.guild.memberCount}`)
  .setColor("#DD1919")
  .setFooter("Covalia | Logs")
  .setTimestamp()
    
    let leaveChannel = member.guild.channels.find('name', 'welcome');
          
    leaveChannel.send(leave);
    
    
  let logChannel = member.guild.channels.find('name', 'mod-log');

    let logEmbed2 = new discord.RichEmbed()
    .setAuthor("Member left", bot.user.displayAvatarURL)
    .setThumbnail(member.user.displayAvatarURL)
      .addField(member.user.username + " Has left the server.", '_ _')
      .addField(`ID: ${member.user.id}`, '_ _')
      .addField(`Tag: #${member.user.discriminator}`, '_ _')
      .addField("Total members:", `${member.guild.memberCount}`)
    .setFooter("Covalia | Logs")
    .setColor("#DD1919")
    .setTimestamp()
    logChannel.send(logEmbed2);
  })

let y = process.openStdin()
y.addListener("data", res => {
  let x = res.toString().trim().split(/ +/g)
  bot.channels.get("561788556419530772").send(x.join(" "));
})

bot.on('message', async message => {

  // parseTime fu

let status = new db.table('AFKs');

// Check if author is AFK
let authorStatus = await status.fetch(message.author.id);

let entries = await db.fetch('afkreason');
let name = await db.fetch('afkreason')


if (entries instanceof Array) entries = entries.slice(-1);


if (authorStatus) { // Run if they are AFK

  const afkembed = new discord.RichEmbed()
    .setColor("#36393e")
    .setDescription(`${message.author.username} is no longer AFK.`)
	
  // Send a 'You are no longer AFK message'
  message.channel.send(afkembed).then(msg => msg.delete(5000));
  
  // This will delete the user from the AFK pool in the database
  status.delete(message.author.id);

}

let mentioned = message.mentions.members.first(); // This will store the first member mentioned
if (mentioned) { // This will run if a member is mentioned

  // Access AFK Status
  let statusw = await status.fetch(mentioned.id);
  let changelog = '';
  for (var i in entries.reverse()) {
    changelog += `**${entries[i].entry}**\n`
  }
  let changelog2 = '';
  for (var i in entries.reverse()) {
    changelog2 += `${entries[i].name}\n`
  }
  if (statusw) { // This will run if they are AFK (since the db will return true)

    message.delete();
    const embed = new discord.RichEmbed()
      .setColor("#36393e")
      .setAuthor(`${changelog2} is AFK!`, bot.user.displayAvatarURL)
      .addField(`Reason: ${changelog}`, '_ _')

    // Send Embed
    message.channel.send(embed);

  }


}

});

bot.login(process.env.token)
