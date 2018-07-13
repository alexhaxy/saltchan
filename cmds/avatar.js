module.exports.run = async (bot, message, args) => {

  let msg = await message.channel.send("Generating avatar...");
  let useravatar;

  if(args.length <= 0) {
    useravatar = message.author.displayAvatarURL;
  } else if(message.mentions.users.first()){
    useravatar = message.mentions.users.first().displayAvatarURL;
  } else {
    return message.channel.send("Unrecognized command");
  }

  message.channel.send({files: [
    {
      attachment: useravatar,
      name: "avatar.png"
    }
  ]});

  msg.delete();
  return;
}

module.exports.help = {
  name: "avatar"
}
