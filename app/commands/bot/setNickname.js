import { prefix } from '../../data/config.json';

export default async (msg, client) => {
  if (msg.content === `${prefix}setnick`) return;

  const username = msg.content.split(' ')[1];
  client.user
    .setUsername(username)
    .then(user =>
      msg.channel.send(`My name has been changed to ${user.username}.`)
    )
    .catch(err => msg.reply(err));
};
