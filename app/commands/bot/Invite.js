import { prefix } from '../../data/config.json';

export default async msg => {
  if (msg.content.startsWith(`${prefix}invite`)) {
    await msg.reply(
      'Here\'s the link to add the bot to your server: https://goo.gl/VM3fx5'
    );
  }
};
