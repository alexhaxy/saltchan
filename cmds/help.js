const fs = require("fs");
module.exports.run = async (bot, message, args) => {
  fs.readFile('./cmds/help.txt', 'utf-8', (err, data) => {
    if (err) throw err;
    message.channel.send(data);
  });
  return;
}

module.exports.help = {
  name: "help"
}
