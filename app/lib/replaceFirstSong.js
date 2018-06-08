import fs from 'fs';
import yt from 'ytdl-core';
import { uniqueId } from 'lodash';

import queueList from '../data/queueList.json';
import { THUMBNAIL_PLACEHOLDER_URL } from '../data/config.json';

export default (message, url, addAtFirst = true) =>
	new Promise(resolve => {
		yt.getInfo(url, {}, (err, info) => {
			if (err) {
				message.channel.send(`:no_entry_sign: Invalid YouTube Link: ${err}`);
				return;
			}

			if (info) {
				if (addAtFirst) {
					queueList[message.guild.id].splice(0, 0, {
						id: uniqueId(),
						url,
						title: info.title,
						time: info.length_seconds,
						thumbnail: info.thumbnail_url || THUMBNAIL_PLACEHOLDER_URL,
						user: message.author.username,
					});
				} else {
					queueList[message.guild.id].splice(1, 0, {
						id: uniqueId(),
						url,
						title: info.title,
						time: info.length_seconds,
						thumbnail: info.thumbnail_url || THUMBNAIL_PLACEHOLDER_URL,
						user: message.author.username,
					});
				}

				const newJSONList = JSON.stringify(queueList, null, '\t');

				fs.writeFileSync(`${__dirname}/../data/queueList.json`, newJSONList);
			}

			resolve();
		});
	});
