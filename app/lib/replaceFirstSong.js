import fs from 'fs';
import yt from 'ytdl-core';

import queueList from '../data/queueList.json';
import prefix from '../../config.json';

export default (message, url) =>
  new Promise(resolve => {
    yt.getInfo(url, {}, (err, info) => {
      if (err) {
        return message.channel.send(
          `:no_entry_sign: Invalid YouTube Link: ${err}`
        );
      }

      queueList[message.guild.id].splice(1, 0, {
        url,
        title: info.title,
        time: info.length_seconds,
        thumbnail: info.thumbnail_url,
        user: message.author.username
      });

      const newJSONList = JSON.stringify(queueList, null, '\t');

      fs.writeFileSync('./app/data/queueList.json', newJSONList);

      resolve();
    });
  });
