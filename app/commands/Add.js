import yt from 'ytdl-core';
import fs from 'fs';

import YouTubeHandler from '../youtubeHandler';
import { prefix } from '../../config.json';
import batchIncludes from '../lib/batchIncludes';

const youTube = YouTubeHandler.getInstance();

const userData = JSON.parse(fs.readFileSync('./app/songs/playlist.json'));

const addFromUrl = (message, url) => {
  if (url === '' || !url) {
    return message.channel.send(
      `A YouTube video url is required after the command, ${prefix}add`
    );
  }

  message.channel.send('Adding song to playlist.');

  yt.getInfo(url, (err, info) => {
    if (err) {
      return message.channel.send(
        `:no_entry_sign: Invalid YouTube Link: ${err}`
      );
    }

    if (!userData[message.author.id]) {
      userData[message.author.id] = {
        songQueue: []
      };
    }

    userData[message.author.id].songQueue.push({
      url,
      title: info.title
    });

    const newJSONList = JSON.stringify(userData, null, '\t');

    fs.writeFileSync('./app/songs/playlist.json', newJSONList);

    message.channel.send(
      `:white_check_mark: Added **${info.title}** to your playlist.`
    );
  });
};

const addFromQuery = (message, query) => {
  youTube.search(query, 2, (err, result) => {
    if (err) {
      return message.channel.send(`:no_entry_sign: **Error:**\n${err}`);
    }

    const url = `https://www.youtube.com/watch?v=${result.items[0].id.videoId}`;
    addFromUrl(message, url);
  });
};

export default msg => {
  console.log(`"${msg.content}"`);
  if (msg.content === `${prefix}add`) return;
  const url = msg.content.split(' ')[1];
  if (url.includes('playlist')) {
    return msg.channel.send(
      ":no_entry_sign: You can't add a Youtube playlist a song."
    );
  }

  const ytStrings = [
    'https://youtube.com/watch',
    'https://www.youtube.com/watch',
    'http://youtube.com/watch',
    'http://www.youtube.com/watch',
    'https://youtu.be/',
    'https://www.youtu.be/',
    'http://youtu.be/',
    'http://www.youtu.be/'
  ];

  if (batchIncludes(ytStrings, url)) {
    addFromUrl(msg, url);
  } else {
    msg.channel.send('You must provide a valid YouTube url.');
  }
};
