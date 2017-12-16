import history from '../../data/history.json';

export default async msg => {
  if (!history[msg.guild.id] || history[msg.guild.id].length === 0) {
    await msg.reply('There are currently no songs in the history.');
    return;
  }

  const historyList = history[msg.guild.id]
    .map(
      (song, index) =>
        `${index + 1}.\n**Title:** ${song.title}\n**URL:** ${
          song.url
        }\n**Requested by:** ${song.user}\n\n`
    )
    .reduce((prev, curr) => `${prev}${curr}`, '');

  await msg.channel.send(`Here's the current song history:\n\n${historyList}`);
};
