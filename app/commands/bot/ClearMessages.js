import { prefix } from '../../../config.json';

export default async msg => {
  if (msg.content.startsWith(`${prefix}clear`)) {
    if (msg.member.permissions.has('MANAGE_CHANNELS')) {
      await msg.channel.bulkDelete(msg.channel.messages);
      await msg.channel.send(`Messages in ${msg.guild.name} deleted.`);
    } else {
      await msg.reply(
        "You don't have the permission to delete messages. Please speak to admin to get these priveleges."
      );
    }
  }
};
