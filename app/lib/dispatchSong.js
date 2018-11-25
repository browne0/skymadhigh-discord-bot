import yt from 'ytdl-core';
import fs from 'fs';
import { RichEmbed } from 'discord.js';

import { prefix, THUMBNAIL_PLACEHOLDER_URL } from '../data/config.json';
import queueList from '../data/queueList.json';
import utils from '../lib';
import LoopHandler from '../handlers/loopHandler';

export default async (connection, message, song = {}) => {
	const embed = new RichEmbed()
		.setColor('ORANGE')
		.setTitle(':microphone: Now Playing')
		.setTimestamp(new Date())
		.setFooter('© Sky Mad High Bot')
		.setThumbnail(song.thumbnail || THUMBNAIL_PLACEHOLDER_URL)
		.addField(`${song.title}`, `Requested by: **${song.user}**\n${song.url}`);
	await message.channel.send(embed);

	const dispatcher = connection.playStream(yt(song.url, { audioonly: true }), {
		volume: 0.1,
	});

	const collector = message.channel.createMessageCollector(m => m);

	collector.on('collect', async m => {
		if (m.content.toLowerCase().startsWith(`${prefix}pause`)) {
			await message.channel.send(':pause_button: Paused.');
			dispatcher.pause();
		} else if (m.content.toLowerCase().startsWith(`${prefix}resume`)) {
			await message.channel.send(':play_pause: Resumed.');
			dispatcher.resume();
		} else if (m.content.toLowerCase().startsWith(`${prefix}skip`)) {
			await message.channel.send(':arrow_forward: Skipped.');
			dispatcher.end('skip');
		} else if (m.content.toLowerCase().startsWith(`${prefix}stop`)) {
			await message.channel.send(':octagonal_sign: Music Stopped.');
			dispatcher.end('stop');
		} else if (m.content.toLowerCase().startsWith(`${prefix}volume`)) {
			if (m.content === `${prefix}volume`) {
				const currentVol = dispatcher.volume;
				await message.channel.send(
					`:speaker: Current volume: ${currentVol * 100}/100.`
				);
				return;
			}
			const vol = m.content.split(' ')[1];
			if (parseInt(vol, 10)) {
				if (Number(vol) < 0 || Number(vol) > 50) {
					await m.reply('The new volume has to be between 1 and 50.');
					return;
				}
				dispatcher.setVolume(Number(vol) / 100);
				await message.channel.send(':speaker: Volume has now been set ');
			}
		} else if (m.content.toLowerCase().startsWith(`${prefix}time`)) {
			await message.channel.send(
				`:clock1: Time: ${Math.floor(dispatcher.time / 60000)}:${
					Math.floor((dispatcher.time % 60000) / 1000) < 10
						? `0${Math.floor((dispatcher.time % 60000) / 1000)}`
						: Math.floor((dispatcher.time % 60000) / 1000)
				}`
			);
		}
	});
	dispatcher.on('end', async reason => {
		collector.stop();
		// on stop or skip we do different things
		if (reason === 'stop') {
			connection.disconnect();
		} else if (reason === 'skip') {
			await utils.addToHistory(message.guild.id);

			if (LoopHandler.getSongLoopStatus()) {
				utils.dispatchSong(connection, message, queueList[message.guild.id][0]);
				return;
			} else if (LoopHandler.getQueueLoopStatus()) {
				queueList[message.guild.id].push(queueList[message.guild.id][0]);
				queueList[message.guild.id].shift();
				const newJSONList = JSON.stringify(queueList, null, '\t');

				fs.writeFileSync(`${__dirname}/../data/queueList.json`, newJSONList);
			} else {
				queueList[message.guild.id].shift();
				const newJSONList = JSON.stringify(queueList, null, '\t');

				fs.writeFileSync(`${__dirname}/../data/queueList.json`, newJSONList);
			}
			if (queueList[message.guild.id].length === 0) {
				message.channel.send(
					"The song queue is now empty. Add more songs when you're ready!"
				);
				connection.disconnect();
				return;
			}

			utils.dispatchSong(connection, message, queueList[message.guild.id][0]);
		} else {
			// otherwise a song is ending.
			await utils.addToHistory(message.guild.id);
			if (LoopHandler.getSongLoopStatus()) {
				utils.dispatchSong(connection, message, queueList[message.guild.id][0]);
				return;
			} else if (LoopHandler.getQueueLoopStatus()) {
				queueList[message.guild.id].push(queueList[message.guild.id][0]);
				queueList[message.guild.id].shift();
				const newJSONList = JSON.stringify(queueList, null, '\t');

				fs.writeFileSync(`${__dirname}/../data/queueList.json`, newJSONList);
			} else {
				// remove the finished song and and go on to the next
				queueList[message.guild.id].shift();
				const newJSONList = JSON.stringify(queueList, null, '\t');

				fs.writeFileSync(`${__dirname}/../data/queueList.json`, newJSONList);

				if (queueList[message.guild.id].length === 0) {
					message.channel.send(
						"The song queue is now empty. Add more songs when you're ready!"
					);
					connection.disconnect();
					return;
				}
			}
			utils.dispatchSong(connection, message, queueList[message.guild.id][0]);
		}
	});
	dispatcher.on('error', err =>
		message.channel.send(`error: ${err}`).then(() => {
			collector.stop();
			// stop trying to play songs
		})
	);
};
