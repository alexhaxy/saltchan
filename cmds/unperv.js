const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let toUnperv = message.guild.member(message.author);

  let role = message.guild.roles.find (r => r.name === botConfig.nsfwRole);
  if (!role) return message.channel.send("Role doesn't exist");

  if (!toUnperv.roles.has(role.id)) return message.channel.send("u never kno da wei");

  await toUnperv.removeRole(role);
  message.channel.send("non-believer!");
}

module.exports.help = {
  name: "falsequeen"
}
