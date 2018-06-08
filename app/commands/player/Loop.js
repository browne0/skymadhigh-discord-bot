/**
 * !loop - loops the queue
 * !loop 5 - loop fifth song in queue
 */

import { prefix } from '../../data/config.json';
import utils from '../../lib';
import ytStrings from '../../data/youtubeStrings.json';
import queueList from '../../data/queueList.json';
import join from '../bot/Join';
import LoopHandler from '../../handlers/loopHandler';

export default async msg => {
	if (msg.content.toLowerCase() === `${prefix}loop`) {
		if (queueList[msg.guild.id].length === 0) {
			await msg.reply(
				'The list of songs is currently empty. You can play a new song with the following command:'
			);

			await msg.channel.send('*!play [youtube video url here]*');
			return;
		}
		if (LoopHandler.getQueueLoopStatus() || LoopHandler.getSongLoopStatus()) {
			LoopHandler.stopQueueLoop();
			LoopHandler.stopSongLoop();
			await msg.reply('We have stopped the looping.');
			return;
		}
		if (msg.member.voiceChannel) {
			if (!LoopHandler.getQueueLoopStatus()) {
				LoopHandler.toggleQueueLoopStatus();
			}
			if (!msg.guild.voiceConnection) {
				try {
					const connection = await join(msg);
					await utils.dispatchSong(connection, msg, queueList[msg.guild.id][0]);
				} catch (e) {
					console.log(e);
				}
				return;
			}
			await msg.reply('We are now looping the queue.');
		} else {
			await msg.reply('You have to join a channel first!');
		}
	} else if (msg.content.toLowerCase().startsWith(`${prefix}loop `)) {
		const secondItem = msg.content.split(' ')[1];

		// if it's a number, loop the specific song
		if (parseInt(secondItem, 10)) {
			const index = parseInt(secondItem, 10);

			if (queueList[msg.guild.id].length === 0) {
				await msg.reply(
					'The list of songs is currently empty. You can play a new song with the following command:'
				);

				await msg.channel.send('*!play [youtube video url here]*');
				return;
			}

			if (queueList[msg.guild.id][index]) {
				if (msg.member.voiceChannel) {
					if (!msg.guild.voiceConnection) {
						if (!LoopHandler.getSongLoopStatus()) {
							LoopHandler.toggleSongLoopStatus();
						}
						try {
							const connection = await join(msg);
							await utils.dispatchSong(
								connection,
								msg,
								queueList[msg.guild.id][index]
							);
						} catch (e) {
							console.log(e);
						}
						return;
					}
					await utils.replaceFirstSong(
						msg,
						queueList[msg.guild.id][index].url,
						false
					);
					msg.guild.voiceConnection.dispatcher.end();
				} else {
					await msg.reply('You have to join a channel first!');
				}
			}
		}

		// assume that it's a youtube string
		else {
			const url = secondItem;
			// check if valid url
			if (utils.batchIncludes(ytStrings, url)) {
				if (!LoopHandler.getSongLoopStatus()) {
					LoopHandler.toggleSongLoopStatus();
				}
				// check to see if connection already exists
				if (msg.guild.voiceConnection) {
					if (url.includes('list')) {
						await msg.reply('You currently can not loop YouTube playlists.');
						return;
					}
					if (queueList[msg.guild.id].length === 0) {
						await utils.addFromUrl(msg, url);
						await utils.dispatchSong(
							msg.guild.voiceConnection,
							msg,
							queueList[msg.guild.id][0],
							true
						);
						return;
					}
					await utils.replaceFirstSong(msg, url, false);
					msg.guild.voiceConnection.dispatcher.end();
					return;
				}
				if (queueList[msg.guild.id].length === 0) {
					await utils.addFromUrl(msg, url);
				} else {
					await utils.replaceFirstSong(msg, url);
				}
				join(msg)
					.then(connection => {
						utils.dispatchSong(
							connection,
							msg,
							queueList[msg.guild.id][0],
							true
						);
					})
					.catch(e => {
						console.log(e);
					});
			} else {
				await msg.channel.send('You must provide a valid YouTube url.');
			}
		}
	}
};
