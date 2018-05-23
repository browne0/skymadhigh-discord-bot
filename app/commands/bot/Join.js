export default msg =>
  new Promise(async (resolve, reject) => {
    const { voiceChannel } = msg.member;
    if (!voiceChannel) {
      msg.reply(
        ":no_entry_sign: You need to connect to a voice channel first."
	  );
	  return;
    } else if (!voiceChannel.joinable) {
      msg.reply(
        ":no_entry_sign: I don't have permission to join this channel."
	  );
	  return;
    } else if (!voiceChannel.full) {
	  msg.reply(":no_entry_sign: This voice channel is currently full.");
	  return;
    }
    try {
      const connection = await voiceChannel.join();
      resolve(connection);
    } catch (e) {
      reject(e);
    }
  });
