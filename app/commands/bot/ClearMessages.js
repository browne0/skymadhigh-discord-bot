import { prefix } from '../../data/config.json';

export default async msg => {
  if (msg.content.startsWith(`${prefix}clear`)) {
    if (msg.channel.permissionsFor(msg.author).has('MANAGE_MESSAGES')) {
      if (msg.channel.type == 'text') {
        msg.channel
          .fetchMessages()
          .then(messages => {
            const now = new Date();
            const messagesToDelete = messages.array().filter(message => {
              const timestamp = message.createdTimestamp;
              return daysBetween(new Date(timestamp), now) < 14;
            });
            // console.log(messagesToDelete.length);
            msg.channel.bulkDelete(messagesToDelete);
            const messagesDeleted = messagesToDelete.length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            msg.channel.send(
              `Deleted messages under 2 weeks old. Total messages deleted: ${messagesDeleted}`
            );
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
          });
      }
    } else {
      await msg.reply(
        "You don't have the permission to delete messages. Please speak to admin to get these priveleges."
      );
    }
  }
};

function daysBetween(date1, date2) {
  // Get 1 day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Convert both dates to milliseconds
  const date1ms = date1.getTime();
  const date2ms = date2.getTime();

  // Calculate the difference in milliseconds
  const differencems = date2ms - date1ms;

  // Convert back to days and return
  return Math.round(differencems / oneDay);
}
