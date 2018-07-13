//register role
const botConfig = require("../botconfig.json");

module.exports.run = async(bot, message, args) => {

  let toUnregister = message.guild.member(message.author);
  let role = message.guild.roles.find(r => r.name === botConfig.supportRole);
  if(!role) return message.channel.send("There is no support");

  if (!toUnregister.roles.has(role.id)) return message.channel.send("You are not registered!");

  await toUnregister.removeRole(role);
  message.channel.send("You have been removed from support list");
  return;

}

module.exports.help = {
  name: "removesup"
}
