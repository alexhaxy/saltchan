const Discord = require("discord.js");
const fs = require("fs");
const ontime = require("ontime");
const moment = require("moment");

const botConfig = require("./botconfig.json");

const prefix = botConfig.prefix;
const boxhead = "\`\`\`";
const boxend = "\`\`\`";

const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

//Load all commands
fs.readdir("./cmds/", (err, files) => {
  if(err) console.error(err);

  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if(jsfiles.length <= 0) {
    console.log("No commands found");
    return;
  }

  console.log(`Loading ${jsfiles.length} commands...`);
  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i + 1}: ${f} loaded`);
    bot.commands.set(props.help.name, props);
  });

});


//On ready generate invite link
bot.on("ready", async () => {
  console.log(`${bot.user.username} is ready!`);

  try{
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  } catch (e){
    console.log(e.stack);
  }
});

//event handler for message
bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let messageArray = message.content.split(/\s+/g);
  let command = messageArray[0];
  let args = messageArray.slice(1);

  if (!command.startsWith(prefix)) return;

  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(bot, message, args);
});

//reset support list on 12AM everyday
ontime({
    cycle: '00:00:10'
}, function (ot) {

  //resetting support list
  console.log('Support List reset!');
  bot.guilds.forEach(g => {
    let role = g.roles.find(r => r.name === botConfig.supportRole);
    if (!role) return;

    let todayDate = moment().subtract(1,'days').format("Do MMM YY"); //get today's date to string
    let suplist = `css\n[Boss Support] \{${todayDate}\}\n--------------\n`;

    g.members.forEach(m => {
      let sRole = m.roles.find(r => r.name === botConfig.supportRole);
      if (!sRole) return;

      //write into string before removing role
      if (!m.nickname) {
        suplist = suplist.concat(m.user.username+"\n");
      } else {
        suplist = suplist.concat(m.nickname+"\n");
      }
      m.removeRole(sRole);
    });

    let chan = g.channels.find(c => c.name === "admins");
    if (!chan) {
      console.log("no admin channel");
    } else {
      chan.send(boxhead + suplist +boxend);
    }
  });

  ot.done();
  return;
});



bot.login(botConfig.token);
