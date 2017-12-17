import { prefix } from '../../../../config.json';
import utils from '../../lib';
import ytStrings from '../../data/youtubeStrings.json';

export default async msg => {
  if (msg.content === `${prefix}add`) return;
  const url = msg.content.split(' ')[1];
  if (url.includes('playlist')) {
    await msg.channel.send(
      ':no_entry_sign: You can only add songs with this command.'
    );
  }

  if (utils.batchIncludes(ytStrings, url)) {
    await utils.addFromUrl(msg, url);
    await msg.reply('Your song has been added.');
  } else {
    await msg.channel.send('You must provide a valid YouTube url.');
  }
};
