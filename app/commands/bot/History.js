import history from '../../data/history.json';

export default async msg => {
  if (!history[msg.guild.id] || history[msg.guild.id].length === 0) {
    await msg.reply('There are currently no songs in the history.');
    return;
  }

  const historyList = history[msg.guild.id]
    .map(
      (song, index) =>
        `${index + 1}.\n**Title:** ${song.title}\n**URL:** <${
          song.url
        }>\n**Requested by:** ${song.user}\n\n`
    )
    .reduce((prev, curr) => `${prev}${curr}`, '');

  const shortHistoryList = history[msg.guild.id]
    .map((song, index) => {
      if (index <= 4) {
        return `${index + 1}.\n**Title:** ${song.title}\n**URL:** <${
          song.url
        }>\n**Requested by:** ${song.user}\n\n`;
      }
      return '';
    })
    .reduce((prev, curr) => `${prev}${curr}`, '');

  if (historyList.length > 2000) {
    await msg.channel.send(
      `Here are the last five songs:\n\n${shortHistoryList}`
    );
  } else {
    await msg.channel.send(
      `Here's the current song history:\n\n${historyList}`
    );
  }
};
