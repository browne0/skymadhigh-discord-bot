import YouTubeHandler from '../youtubeHandler';
import { addFromUrl } from '../lib';

const youTube = YouTubeHandler.getInstance();

export default (message, query) => {
  youTube.search(query, 2, (err, result) => {
    if (err) {
      return message.channel.send(`:no_entry_sign: **Error:**\n${err}`);
    }

    const url = `https://www.youtube.com/watch?v=${result.items[0].id.videoId}`;
    addFromUrl(message, url);
  });
};
