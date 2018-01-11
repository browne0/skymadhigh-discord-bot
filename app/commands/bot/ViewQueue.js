import { RichEmbed } from 'discord.js';

import queueList from '../../data/queueList.json';
import { prefix } from '../../data/config.json';

export default async msg => {
  if (msg.content.startsWith(`${prefix}queue`)) {
    if (queueList[msg.guild.id].length === 0) {
      await msg.reply('There are currently no songs in the queue.');
    } else {
      const listOfTitles = queueList[msg.guild.id].map((song, index) => [
        `**${index + 1}.** *${song.title}*`,
        `**${song.user}**`,
        song.url
      ]);

      const length = listOfTitles.length > 25 ? '25' : listOfTitles.length;

      const embed = new RichEmbed()
        .setColor('ORANGE')
        .setTitle(':notes: Song Queue')
        .setTimestamp(new Date())
        .setFooter('© Sky Mad High Bot')
        .setDescription(`Here are the next ${length} songs in the queue!`);
      for (let i = 0; i < listOfTitles.length; i += 1) {
        if (i === 25) {
          break;
        }
        embed.addField(
          listOfTitles[i][0],
          `Requested by: ${listOfTitles[i][1]}`
        );
      }
      await msg.channel.send(embed);
    }
  }
};
