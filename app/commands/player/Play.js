import fs from 'fs';

import queueList from '../../data/queueList.json';
import { prefix } from '../../data/config.json';
import join from '../bot/Join';
import ytStrings from '../../data/youtubeStrings.json';
import utils from '../../lib';
import { queuePlaylist } from '../../lib/addFromUrl';

export default async msg => {
	if (msg.content.toLowerCase() === `${prefix}play`) {
		if (!queueList[msg.guild.id]) {
			queueList[msg.guild.id] = [];

			const newJSONList = JSON.stringify(queueList, null, '\t');

			fs.writeFileSync(`${__dirname}/../../data/queueList.json`, newJSONList);
		}
		if (queueList[msg.guild.id].length === 0) {
			await msg.reply(
				'The list of songs is currently empty. You can play a new song with the following command:'
			);

			await msg.channel.send('*!play [youtube video url here]*');
			return;
		}
		if (msg.member.voiceChannel) {
			if (!msg.guild.voiceConnection) {
				try {
					const connection = await join(msg);
					await utils.dispatchSong(connection, msg, queueList[msg.guild.id][0]);
				} catch (e) {
					console.log(e);
				}
			}

			if (msg.guild.voiceConnection.speaking) {
				await msg.reply('There is already a song playing!');
			}
		} else {
			await msg.reply('You have to join a channel first!');
		}
	} else if (msg.content.toLowerCase().startsWith(`${prefix}play `)) {
		if (!queueList[msg.guild.id]) {
			queueList[msg.guild.id] = [];

			const newJSONList = JSON.stringify(queueList, null, '\t');

			fs.writeFileSync(`${__dirname}/../../data/queueList.json`, newJSONList);
		}
		const secondWord = msg.content.split(' ')[1];
		if (parseInt(secondWord, 10)) {
			const index = Number(secondWord);
			if (index <= queueList[msg.guild.id].length && index >= 1) {
				if (msg.guild.voiceConnection) {
					await utils.replaceFirstSong(
						msg,
						queueList[msg.guild.id][index - 1].url,
						false
					);
					msg.guild.voiceConnection.dispatcher.end();

					queueList[msg.guild.id].splice(index - 1, 1);
					const newJSONList = JSON.stringify(queueList, null, '\t');

					fs.writeFileSync(
						`${__dirname}/../../data/queueList.json`,
						newJSONList
					);
				} else {
					try {
						const connection = await join(msg);
						utils.dispatchSong(
							connection,
							msg,
							queueList[msg.guild.id][index - 1]
						);
						await utils.replaceFirstSong(
							msg,
							queueList[msg.guild.id][index - 1].url
						);
						queueList[msg.guild.id].splice(index, 1);
						const newJSONList = JSON.stringify(queueList, null, '\t');

						fs.writeFileSync(
							`${__dirname}/../../data/queueList.json`,
							newJSONList
						);
					} catch (e) {
						console.log(e);
					}
				}
			} else {
				await msg.reply(
					'Please choose a song from the queue, using `!play [position in list].` If you want to play the current song, just type `!play`.'
				);
			}
		} else {
			const url = secondWord;
			// check if valid url
			if (utils.batchIncludes(ytStrings, url)) {
				// check to see if connection already exists
				if (msg.guild.voiceConnection) {
					if (url.includes('list')) {
						const playlistID = utils.getParameterByName('list', url);
						queuePlaylist(playlistID, msg, '', url);
						return;
					}
					if (queueList[msg.guild.id].length === 0) {
						await utils.addFromUrl(msg, url);
						await utils.dispatchSong(
							msg.guild.voiceConnection,
							msg,
							queueList[msg.guild.id][0]
						);
						return;
					}
					await utils.replaceFirstSong(msg, url, false);
					if (msg.guild.voiceConnection.dispatcher) {
						msg.guild.voiceConnection.dispatcher.end();
					}
					return;
				}
				if (queueList[msg.guild.id].length === 0) {
					await utils.addFromUrl(msg, url);
				} else {
					await utils.replaceFirstSong(msg, url);
				}
				join(msg)
					.then(connection => {
						utils.dispatchSong(connection, msg, queueList[msg.guild.id][0]);
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
