import fs from 'fs';
import yt from 'ytdl-core';
import { uniqueId } from 'lodash';
import request from 'request';

import queueList from '../data/queueList.json';
import utils from '../lib';
import { youtubeKey } from '../keys';
import { THUMBNAIL_PLACEHOLDER_URL } from '../data/config.json';

export default (message, url) =>
	new Promise(async resolve => {
		if (url === '' || !url) {
			await message.channel.send('Please provide a valid YouTube link.');
		}

		if (!queueList[message.guild.id]) {
			queueList[message.guild.id] = [];
		}

		if (url.includes('list')) {
			const playlistID = utils.getParameterByName('list', url);
			queue_playlist(playlistID, message, '', url);
			resolve('playlist');
		} else {
			yt.getInfo(url, {}, (err, info) => {
				if (err) {
					return message.channel.send(
						`:no_entry_sign: Invalid YouTube Link: ${err}`
					);
				}
				if (info) {
					queueList[message.guild.id].push({
						id: uniqueId(),
						url,
						title: info.title,
						time: info.length_seconds,
						thumbnail:
							info.thumbnail_url || THUMBNAIL_PLACEHOLDER_URL,
						user: message.author.username,
					});
				}

				const newJSONList = JSON.stringify(queueList, null, '\t');

				fs.writeFileSync(`${__dirname}/../data/queueList.json`, newJSONList);

				resolve('song');
			});
		}
	});

function queue_playlist(playlistId, message, pageToken = '', url) {
	request(
		`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${youtubeKey}&pageToken=${pageToken}`,
		(error, response, body) => {
			const json = JSON.parse(body);
			if ('error' in json) {
				message.reply(
					`An error has occurred: ${json.error.errors[0].message} - ${
						json.error.errors[0].reason
					}`
				);
			} else if (json.items.length === 0) {
				message.reply('No videos found within playlist.');
			} else {
				for (let i = 0; i < json.items.length; i++) {
					yt.getInfo(
						`https://youtube.com/watch?v=${
							json.items[i].snippet.resourceId.videoId
						}`,
						{},
						(err, info) => {
							if (info) {
								queueList[message.guild.id].push({
									id: uniqueId(),
									url: `https://youtube.com/watch?v=${
										json.items[i].snippet.resourceId.videoId
									}`,
									title: info.title,
									time: info.length_seconds,
									thumbnail:
										info.thumbnail_url || THUMBNAIL_PLACEHOLDER_URL,
									user: message.author.username,
								});
							}

							const newJSONList = JSON.stringify(queueList, null, '\t');

							fs.writeFileSync(
								`${__dirname}/../data/queueList.json`,
								newJSONList
							);
						}
					);
				}
				if (json.nextPageToken == null) {
					return;
				}
				queue_playlist(playlistId, message, json.nextPageToken, url);
			}
		}
	);
}
