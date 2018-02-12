import { RichEmbed } from 'discord.js';

export default async msg => {
  const embed = new RichEmbed()
    .setColor('ORANGE')
    .setTitle(':question: Help')
    .setTimestamp(new Date())
    .setFooter('© Sky Mad High Bot')
    .setDescription(
      "I'm here to help! Here's a list of all my commands. Click the corresponding number for more information about the command."
    )
    .addField('1 - Main Menu', 'Takes you back to the main menu.')
    .addField('2 - Play', 'Play a song from YouTube.')
    .addField('3 - Add', 'Add a song to the queue.')
    .addField('4 - View Queue', 'Shows the current song queue.')
    .addField('5 - Now Playing', 'Shows the currently playing song.')
    .addField('6 - View History', 'Shows the last five songs that were played.')
    .addField(
      '7 - Music Controls',
      'Shows the available commands when listening to music.'
    )
    .addField(
      '8 - Admin Controls',
      'Shows the available admin commands for this bot.'
    );
  const helpMessage = await msg.channel.send(embed);

  await helpMessage.react('1⃣'); // one
  await helpMessage.react('2⃣'); // two
  await helpMessage.react('3⃣'); // three
  await helpMessage.react('4⃣'); // four
  await helpMessage.react('5⃣'); // five
  await helpMessage.react('6⃣'); // six
  await helpMessage.react('7⃣'); // seven
  await helpMessage.react('8️⃣'); // eight
  await helpMessage.react('⛔'); // trash

  const collector = await helpMessage.createReactionCollector(
    (reaction, user) => !user.bot
  );

  collector.on('collect', async r => {
    const newEmbed = new RichEmbed()
      .setColor('ORANGE')
      .setTimestamp(new Date())
      .setFooter('© Sky Mad High Bot');
    const users = r.users.array();
    const user = users[1];
    if (r.emoji.name === '1⃣') {
      await helpMessage.edit(embed);
      await r.remove(user);
    } else if (r.emoji.name === '2⃣') {
      newEmbed
        .setTitle(':headphones: Play')
        .addField(
          'Description',
          'The play command is used to play a song from the queue. There are three different ways this command can be used:'
        )
        .addField(
          '!play',
          'Plays the first song from the queue if no music is playing.'
        )
        .addField('!play [youtube url]', 'Plays a song given a YouTube url.')
        .addField(
          '!play [position in queue]',
          'Plays a specific song from your queue given the position of the song.'
        );
      await helpMessage.edit(newEmbed);
      await r.remove(user);
    } else if (r.emoji.name === '3⃣') {
      newEmbed
        .setTitle(':headphones: Add')
        .addField(
          'Description',
          'The add command is used to add a song to the queue.'
        )
        .addField('!add [youtube url]', 'Adds a YouTube video to the queue.');
      await helpMessage.edit(newEmbed);
      await r.remove(user);
    } else if (r.emoji.name === '4⃣') {
      newEmbed
        .setTitle(':headphones: View Queue')
        .addField(
          'Description',
          'The queue command is used to list the upcoming songs in the queue. It can also be used to clear the current song queue.'
        )
		.addField('!queue', 'Lists the current song queue.');
		.addField('!queue clear', 'Clears the current song queue.');
      await helpMessage.edit(newEmbed);
      await r.remove(user);
    } else if (r.emoji.name === '5⃣') {
      newEmbed
        .setTitle(':headphones: Now Playing')
        .addField('Description', 'Displays the current playing song, if any.')
        .addField('!np', 'Lists the current playing song.');
      await helpMessage.edit(newEmbed);
      await r.remove(user);
    } else if (r.emoji.name === '6⃣') {
      newEmbed
        .setTitle(':headphones: View History')
        .addField(
          'Description',
          'The history command is used to display the last five songs that were played.'
        )
        .addField(
          '!history',
          'Shows the last five songs that I played for you.'
        );
      await helpMessage.edit(newEmbed);
      await r.remove(user);
    } else if (r.emoji.name === '7⃣') {
      newEmbed
        .setTitle(':headphones: Music Controls')
        .setDescription(
          'There are several different commands that you can use while listening to music. Here are the ones that are currently available:'
        )
        .addField('!pause', 'Pauses the current song.')
        .addField('!resume', 'Resumes a paused song.')
        .addField('!skip', 'Skips the currently playing song.')
        .addField(
          '!stop',
          'Stops the current playing song. \n **NOTE:** This makes the bot leave the channel.'
        )
        .addField(
          '!volume [number between 0 and 50]',
          'Sets the volume of the player.'
        )
        .addField(
          '!time',
          "Displays the current time in the song you're listening to."
        );
      await helpMessage.edit(newEmbed);
      await r.remove(user);
    } else if (r.emoji.name === '8️⃣') {
		newEmbed
        .setTitle(':tools: Admin Controls')
        .setDescription(
          'There are several different commands that admins can use. Here are the ones that are currently available:'
        )
        .addField('!clear or !clear [number]', 'Clears all messages, or certain number of messages up to two weeks old.')
      await helpMessage.edit(newEmbed);
      await r.remove(user);
	} else if (r.emoji.name === '⛔') {
      collector.stop();
      helpMessage.delete();
    }
  });
};
