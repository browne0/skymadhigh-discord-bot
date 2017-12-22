import { prefix } from '../../../config.json';

export default async msg => {
  if (msg.content.startsWith(`${prefix}clear`)) {
    if (msg.channel.permissionsFor(msg.author).has('MANAGE_MESSAGES')) {
      if (msg.channel.type == 'text') {
        msg.channel
          .fetchMessages()
          .then(messages => {
            msg.channel.bulkDelete(messages);
            const messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            msg.channel.send(
              `Deletion of messages successful. Total messages deleted: ${messagesDeleted}`
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
