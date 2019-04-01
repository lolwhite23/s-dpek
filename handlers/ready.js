

module.exports = {

    ready : (bot) => {
        bot.login(process.env.token)
        bot.on('ready', () => {
            bot.user.setActivity(`${bot.guilds.size} guilds! & ${bot.users.size} users!`, {type: 'WATCHING'});
            bot.user.setStatus('online');
            console.log(`${bot.user.username} is online! It is watching ${bot.guilds.size} guilds.`);
        });
    }
    
};
