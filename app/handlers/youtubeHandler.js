import YouTube from 'youtube-node';
import { youtubeKey } from '../keys';

let singleton;

export default {
	getInstance: () => {
		if (singleton) return singleton;
		singleton = new YouTube();
		singleton.setKey(youtubeKey);

		return singleton;
	},
};
