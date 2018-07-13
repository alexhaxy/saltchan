const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let toPerv = message.guild.member(message.author);
  let nsfwChannel = message.guild.channels.find(c => c.name == "nsfw");

  if (!nsfwChannel) return message.channel.send("There is no wei :cry: (ask admin to create nsfw channel lol)");

  let role = message.guild.roles.find (r => r.name === botConfig.nsfwRole);

  if(!role) {
    try {
      role = await message.guild.createRole({
        name: botConfig.nsfwRole,
        color: "#f1c40f",
        permission: []
      });

      //console.log(message.guild.channels.find(c => c.name === "nsfw"));
      await nsfwChannel.overwritePermissions(role, {
        READ_MESSAGES: true,
        SEND_MESSAGES: true,
        ADD_REACTIONS: true,
        MANAGE_MESSAGES: true
      });


    } catch (e) {
      console.log(e.stack);
    }
  }


  if (toPerv.roles.has(role.id)) return message.channel.send("u already kno da wei");

  await toPerv.addRole(role);
  message.channel.send("brudda shows u da wei *cluck*");
  return;

}

module.exports.help = {
  name: "showmedawei"
}
