import { RichEmbed } from 'discord.js';

import history from '../../data/history.json';

export default async msg => {
	if (!history[msg.guild.id] || history[msg.guild.id].length === 0) {
		await msg.reply('There are currently no songs in the history.');
		return;
	}

	const historyList = history[msg.guild.id].map((song, index) => [
		`**${index + 1}.** *${song.title}*`,
		`**${song.user}**`,
		song.url,
	]);

	const length = historyList.length > 25 ? '25' : historyList.length;

	const embed = new RichEmbed()
		.setColor('ORANGE')
		.setTitle(':books: Song History')
		.setTimestamp(new Date())
		.setFooter('© Sky Mad High Bot')
		.setDescription(`Here are the last ${length} songs that were played!`);

	for (let i = 0; i < historyList.length; i += 1) {
		if (i === 25) {
			break;
		}
		embed.addField(historyList[i][0], `Requested by: ${historyList[i][1]}`);
	}

	await msg.channel.send(embed);
};
