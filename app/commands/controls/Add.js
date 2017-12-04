import { prefix } from '../../../config.json';
import utils from '../../lib';

export default msg => {
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

  if (utils.batchIncludes(ytStrings, url)) {
    utils.addFromUrl(msg, url);
  } else {
    msg.channel.send('You must provide a valid YouTube url.');
  }
};
