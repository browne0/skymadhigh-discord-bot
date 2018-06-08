import { prefix } from '../../data/config.json';

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

export default async msg => {
	if (msg.content.toLowerCase().startsWith(`${prefix}clear`)) {
		if (msg.channel.permissionsFor(msg.author).has('MANAGE_MESSAGES')) {
			if (msg.channel.type === 'text') {
				msg.channel
					.fetchMessages()
					.then(messages => {
						const now = new Date();
						const hasSecond = !!msg.content.startsWith(`${prefix}clear `);
						let count = messages.array().length;

						if (hasSecond && parseInt(msg.content.split(' ')[1], 10)) {
							count = msg.content.split(' ')[1]; // eslint-disable-line
						}
						const messagesToDelete = messages
							.array()
							.slice(0, count)
							.filter(message => {
								const timestamp = message.createdTimestamp;
								return daysBetween(new Date(timestamp), now) < 14;
							});
						if (messagesToDelete.length > 2 && messagesToDelete.length < 100) {
							msg.channel.bulkDelete(messagesToDelete);
							const messagesDeleted = messagesToDelete.length; // number of messages deleted

							// Logging the number of messages deleted on both the channel and console.
							msg.channel.send(
								`Deleted messages under 2 weeks old. Total messages deleted: ${messagesDeleted}`
							);
						} else {
							msg.reply(
								'You provided too few or too many messages to delete. You must provide at least 2 and at most 100 messages to delete.'
							);
						}
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
