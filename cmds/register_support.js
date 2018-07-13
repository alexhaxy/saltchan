//register role
const roleName = "boss_support";

module.exports.run = async(bot, message, args) => {

  let toRegister = message.guild.member(message.author);
  let role = message.guild.roles.find(r => r.name === roleName);
  if(!role) {
    try {
      role = await message.guild.createRole({
        name: roleName,
        color: "#b942f4",
        permission: [],
        mentionable: true,
        hoist: true
      });

    } catch (e) {
      console.log(e.stack);
    }
  }

  if (toRegister.roles.has(role.id)) return message.channel.send("You are already registered!");

  await toRegister.addRole(role);
  message.channel.send("You have been registered as support, Thanks for helping!");
  return;

}

module.exports.help = {
  name: "regsup"
}
