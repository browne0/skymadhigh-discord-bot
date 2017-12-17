import yt from 'ytdl-core';
import fs from 'fs';

import { prefix } from '../../../config.json';
import queueList from '../data/queueList.json';
import utils from '../lib';

export default async (connection, message, song) => {
  await message.channel.send(
    `Now Playing: **${song.title}** from **${song.user}**.`
  );

  const dispatcher = connection.playStream(yt(song.url, { audioonly: true }), {
    volume: 0.05
  });

  const collector = message.channel.createMessageCollector(m => m);

  collector.on('collect', async m => {
    if (m.content.startsWith(`${prefix}pause`)) {
      await message.channel.send(':pause_button: Paused.');
      dispatcher.pause();
    } else if (m.content.startsWith(`${prefix}resume`)) {
      await message.channel.send(':play_pause: Resumed.');
      dispatcher.resume();
    } else if (m.content.startsWith(`${prefix}skip`)) {
      await message.channel.send(':arrow_forward: Skipped.');
      dispatcher.end('skip');
    } else if (m.content.startsWith(`${prefix}stop`)) {
      await message.channel.send(':octagonal_sign: Music Stopped.');
      dispatcher.end('stop');
    } else if (m.content.startsWith(`${prefix}volume`)) {
      if (m.content === `${prefix}volume`) {
        const currentVol = dispatcher.volume;
        await message.channel.send(
          `:speaker: Current volume: ${currentVol * 100}/100.`
        );
        return;
      }
      const vol = m.content.split(' ')[1];
      if (parseInt(vol, 10)) {
        if (Number(vol) < 0 || Number(vol) > 50) {
          await m.reply('The new volume has to be between 1 and 50.');
          return;
        }
        dispatcher.setVolume(Number(vol) / 100);
        await message.channel.send(':speaker: Volume has now been set ');
      }
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
  dispatcher.on('end', async reason => {
    collector.stop();
    // on stop or skip we do different things
    if (reason === 'stop') {
      return message.member.voiceChannel.leave();
    } else if (reason === 'skip') {
      await utils.addToHistory(message.guild.id);
      const index = queueList[message.guild.id].findIndex(
        item => item.id === song.id
      );

      queueList[message.guild.id].splice(index, 1);
      const newJSONList = JSON.stringify(queueList, null, '\t');

      fs.writeFileSync('./app/data/queueList.json', newJSONList);

      if (queueList[message.guild.id].length === 0) {
        message.channel.send(
          "The song queue is now empty. Add more songs when you're ready!"
        );
        return message.member.voiceChannel.leave();
      }
      utils.dispatchSong(connection, message, queueList[message.guild.id][0]);
    } else {
      // otherwise a song is ending.
      //  remove the finished song and and go on to the next
      await utils.addToHistory(message.guild.id);
      queueList[message.guild.id].shift();
      const newJSONList = JSON.stringify(queueList, null, '\t');

      fs.writeFileSync('./app/data/queueList.json', newJSONList);

      if (queueList[message.guild.id].length === 0) {
        message.channel.send(
          "The song queue is now empty. Add more songs when you're ready!"
        );
        return message.member.voiceChannel.leave();
      }
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
