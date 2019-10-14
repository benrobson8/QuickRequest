const Discord = require('discord.js');
const client = new Discord.Client({ disableEveryone: true });

module.exports = async (reaction, user) => {
  let channel = reaction.message.channel.name;
  let message = reaction.message, emoji = reaction.emoji;

  if (user.bot == true) return; // This stops the bot from picking up it's own reactions.
  if (!channel) return; // This allows the bot to only detect changes in the #requests channel

  let usersname = reaction.message.embeds[0].fields[0].value;
  let userid = reaction.message.embeds[0].fields[2].value;
  let requesteduser = message.guild.member(message.guild.members.get(userid));

  if (emoji.name == '✅') {
    let requestaccept = new Discord.RichEmbed()
      .setTitle('Request Accepted')
      .setColor('#329932')
      .setDescription(`Congratulations! Your request has been accepted!\nYou should be whitelisted on our servers now. The IP to login is **${process.env.ipaddress}**`)
    requesteduser.send(requestaccept);
    console.log(`[CONSOLE] ${usersname}\'s request has been accepted!`);
    message.delete();
    return;
  } else if (emoji.name == '❎') {
    console.log(`[CONSOLE] ${usersname}\'s request has been denied.`);
    message.delete();
    return;
  };
};
