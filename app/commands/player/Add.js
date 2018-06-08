import { prefix } from '../../data/config.json';
import utils from '../../lib';
import ytStrings from '../../data/youtubeStrings.json';

export default async msg => {
	if (msg.content.toLowerCase() === `${prefix}add`) return;
	const url = msg.content.split(' ')[1];
	if (utils.batchIncludes(ytStrings, url)) {
		const response = await utils.addFromUrl(msg, url);
		await msg.reply(`Your ${response} has been added.`);
	} else {
		await msg.channel.send('You must provide a valid YouTube url.');
	}
};
