const Discord = module.require("discord.js");
//userinfo
module.exports.run = async (bot, message, args) => {

  let username;
  let useravatar;

  if(args.length <= 0) {
    username = message.author.username;
    useravatar = message.author.displayAvatarURL;
  } else if(message.mentions.users.first()){
    username = message.mentions.users.first().username;
    useravatar = message.mentions.users.first().displayAvatarURL;
  } else {
    return message.channel.send("Unrecognized command");
  }

  let embed = new Discord.RichEmbed()
    .setAuthor(username)
    .setDescription("User Description")
    .setColor("#FF0000")
    .setThumbnail(useravatar);

  message.channel.send(embed);
}

module.exports.help = {
  name: "userinfo"
}
