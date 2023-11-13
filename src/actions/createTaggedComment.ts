'use server';
import { addNotification } from '@/actions/addNotification';
import { getMappedUserIds } from '@/actions/getMappedUserIds';

export const createTaggedComment = async (taskId: string, text: string) => {
	console.log({ taskId, text });
	const userIdsArray = await getMappedUserIds();

	const [firstWord, ...rest] = (text as string).split(' ');
	if (firstWord.startsWith('@')) {
		const tag = firstWord.slice(1);
		const taggedUserId = userIdsArray.find(el => el.username === tag)?.userId;
		const notificationText = `You've been mentioned in a comment "${rest.join(' ')}" to task ${taskId.slice(0, 4)}`;
		console.log({ notificationText, taggedUserId });
		await addNotification(notificationText, taggedUserId);
	}
};
