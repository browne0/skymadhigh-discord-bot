import yt from 'ytdl-core';
import fs from 'fs';

import { prefix } from '../../config.json';
import queueList from '../data/queueList.json';
import utils from '../lib';

export default async (connection, message, song) => {
  await message.channel.send(
    `Now Playing: **${song.title}** from **${song.user}**.`
  );

  const dispatcher = message.guild.voiceConnection.playStream(
    yt(song.url, { audioonly: true })
  );

  const collector = message.channel.createMessageCollector(m => m);

  collector.on('collect', async m => {
    if (m.content.startsWith(`${prefix}pause`)) {
      await message.channel.send(':pause_button: Paused.').then(() => {
        dispatcher.pause();
      });
    } else if (m.content.startsWith(`${prefix}resume`)) {
      await message.channel.send(':play_pause: Resumed.').then(() => {
        dispatcher.resume();
      });
    } else if (m.content.startsWith(`${prefix}skip`)) {
      await message.channel.send(':arrow_forward: Skipped.').then(() => {
        dispatcher.end();
      });
    } else if (m.content.startsWith(`${prefix}stop`)) {
      await message.channel.send(':octagonal_sign: Music Stopped.').then(() => {
        dispatcher.end('stop');
      });
    } else if (m.content.startsWith(`${prefix}time`)) {
      await message.channel.send(
        `:clock1: Time: ${Math.floor(dispatcher.time / 60000)}:${
          Math.floor((dispatcher.time % 60000) / 1000) < 10
            ? `0${Math.floor((dispatcher.time % 60000) / 1000)}`
            : Math.floor((dispatcher.time % 60000) / 1000)
        }`
      );
    }
  });
  dispatcher.on('end', reason => {
    collector.stop();
    // on end we need to remove that song from the queue, and play the next one.
    if (reason) {
      return message.member.voiceChannel.leave();
    }
    queueList[message.guild.id].shift();
    const newJSONList = JSON.stringify(queueList, null, '\t');

    fs.writeFileSync('./app/data/queueList.json', newJSONList);

    if (queueList[message.guild.id].length === 0) {
      message.channel.send(
        "The song queue is now empty. Add more songs when you're ready!"
      );
      message.member.voiceChannel.leave();
    } else {
      // find next song and play
      utils.dispatchSong(connection, message, queueList[message.guild.id][0]);
    }
  });
  dispatcher.on('error', err =>
    message.channel.send(`error: ${err}`).then(() => {
      collector.stop();
      // stop trying to play songs
    })
  );
};
