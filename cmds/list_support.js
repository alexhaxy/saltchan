const botConfig = require("../botconfig.json");

module.exports.run = async (bot, message, args) => {
  let role = message.guild.roles.find(r => r.name === botConfig.supportRole);
  if (!role) return message.channel.send("There is no support");

  let list ="";

  role.members.forEach(m => {
    if (m.nickname) {
      list = list.concat(m.nickname + "\n");
    } else {
      list = list.concat(m.user.username + "\n");
    }

  });
  
  let headerMsg = "\`\`\`css\n[Boss Support]\n--------------\n";
  let footMsg ="\`\`\`";

  message.channel.send(headerMsg.concat(list.concat(footMsg)));
  return;
}

module.exports.help = {
  name: "listsup"
}
