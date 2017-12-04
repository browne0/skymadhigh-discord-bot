import fs from 'fs';

import queueList from '../../data/queueList.json';
import { prefix } from '../../../config.json';
import join from '../bot/Join';
import ytStrings from '../../data/youtubeStrings.json';
import utils from '../../lib';

export default async msg => {
  if (msg.content === `${prefix}play`) {
    if (!queueList[msg.guild.id]) {
      queueList[msg.guild.id] = [];

      const newJSONList = JSON.stringify(queueList, null, '\t');

      fs.writeFileSync('./app/data/queueList.json', newJSONList);
    }
    if (queueList[msg.guild.id].length === 0) {
      await msg.reply(
        'The list of songs is currently empty. You can play a new song with the following command:'
      );

      await msg.channel.send('*!play [youtube video url here]*');
      return;
    }
    if (msg.member.voiceChannel) {
      const connection = await join(msg);

      utils.dispatchSong(connection, msg, queueList[msg.guild.id][0]);
    } else {
      await msg.reply('You have to join a channel first!');
    }
  } else if (msg.content.startsWith(`${prefix}play `)) {
    const url = msg.content.split(' ')[1];

    if (utils.batchIncludes(ytStrings, url)) {
      if (queueList[msg.guild.id].length >= 1) {
        // replace the first song with the new song
        await utils.replaceFirstSong(msg, url);
      } else {
        // add one song to the queue
        await utils.addFromUrl(msg, url);
      }

      join(msg).then(connection => {
        utils.dispatchSong(connection, msg, queueList[msg.guild.id][0]);
      });
    } else {
      await msg.channel.send('You must provide a valid YouTube url.');
    }
  }
};
