'use server';
import { getMappedUserIds } from '@/actions/getMappedUserIds';
import { createNotification } from '@/modules/Toast/actions/createNotification';

export const createTaggedComment = async (taskId: string, text: string) => {
	const userIdsArray = await getMappedUserIds();

	const [firstWord, ...rest] = (text as string).split(' ');
	if (firstWord.startsWith('@')) {
		const tag = firstWord.slice(1);
		const taggedUserId = userIdsArray.find(el => el.username === tag)?.userId;

		if (!taggedUserId) return;

		const notificationText = `You've been mentioned in a comment "${rest.join(' ')}" to task`;

		await createNotification(notificationText, taskId, taggedUserId);
	}
};
