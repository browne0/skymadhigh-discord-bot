import fs from 'fs';
import yt from 'ytdl-core';

import queueList from '../data/queueList.json';
import prefix from '../../config.json';

export default (message, url) => {
  if (url === '' || !url) {
    return message.channel.send(
      `A YouTube video url is required after the command, ${prefix}add`
    );
  }

  message.channel.send('Adding song to playlist.');
  console.log(message);
  yt.getInfo(url, (err, info) => {
    if (err) {
      return message.channel.send(
        `:no_entry_sign: Invalid YouTube Link: ${err}`
      );
    }

    if (!queueList[message.guild.id]) {
      queueList[message.guild.id] = [];
    }

    queueList[message.guild.id].push({
      url,
      title: info.title,
      time: info.length_seconds,
      thumbnail: info.thumbnail_url,
      description: info.description
    });

    const newJSONList = JSON.stringify(queueList, null, '\t');

    fs.writeFileSync('./app/data/queueList.json', newJSONList);

    message.channel.send(
      `:white_check_mark: Added **${info.title}** to your playlist.`
    );
  });
};
