export default (msg => new Promise(async (resolve, reject) => {
  const { voiceChannel } = msg.member;
  if (!voiceChannel || voiceChannel.type !== 'voice') {
    return msg.reply(":no_entry_sign: I couldn't connect to your voice channel.");
  }
  try {
    const connection = await voiceChannel.join();
    resolve(connection);
  } catch (e) {
    reject(e);
  }
}));