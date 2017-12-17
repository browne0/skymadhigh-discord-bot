import queueList from '../../data/queueList.json';
import { prefix } from '../../../../config.json';

export default async msg => {
  if (msg.content.startsWith(`${prefix}queue`)) {
    if (queueList[msg.guild.id].length === 0) {
      await msg.reply('There are currently no songs in the queue.');
    } else {
      const listOfTitles = queueList[msg.guild.id]
        .map(
          (song, index) =>
            `**${index + 1}.** *${song.title}* from **${song.user}**`
        )
        .reduce((prev, curr) => `${prev} \n${curr}`, '');
      msg.channel.send(listOfTitles);
    }
  }
};
