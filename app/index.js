import { Client } from 'discord.js';

import { discordToken } from './keys';

import { prefix } from './data/config.json';
import commands from './commands';

const client = new Client();

client.once('ready', () => {
  console.log(
    `Bot has started, with ${client.users.size} channels of ${
      client.guilds.size
    } servers.`
  );

  client.user.setPresence({ game: { name: 'custom playlists!', type: 0 } });
});

client.on('guildCreate', guild => {
  // This event triggers when the bot joins a guild.
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${
      guild.memberCount
    } members!`
  );
});

client.on('message', async message => {
  if (message.author.bot) return;

  if (!message.content.startsWith(prefix)) return;

  const command = message.content
    .toLowerCase()
    .slice(prefix.length)
    .split(' ')[0];
  if (commands.hasOwnProperty(command)) {
    commands[command](message, client);
  }
});

client.login(discordToken);
