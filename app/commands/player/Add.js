import { prefix } from '../../data/config.json';
import utils from '../../lib';
import ytStrings from '../../data/youtubeStrings.json';

export default async msg => {
  if (msg.content === `${prefix}add`) return;
  const url = msg.content.split(' ')[1];
  if (utils.batchIncludes(ytStrings, url)) {
    if (url.includes('list')) {
      const index = url.indexOf('list=');
      await msg.channel.send(
        ':no_entry_sign: You can only add songs with this command.'
      );
    } else {
      await utils.addFromUrl(msg, url);
      await msg.reply('Your song has been added.');
    }
  } else {
    await msg.channel.send('You must provide a valid YouTube url.');
  }
};
