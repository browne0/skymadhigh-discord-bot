import queueList from '../../data/queueList.json';
import { prefix } from '../../../config.json';

export default (async msg => {
  if (msg.content.startsWith(`${prefix}np`)) {
    if (!msg.guild.voiceConnection) {
      await msg.reply('There is currently no music playing!');
    } else {
      const song = queueList[msg.guild.id][0].title;
      await msg.reply(`The current playing song is **${song}**`);
    }
  }
});