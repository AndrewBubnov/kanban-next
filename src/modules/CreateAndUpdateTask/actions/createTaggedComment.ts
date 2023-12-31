'use server';
import { getMappedUserIds } from '@/modules/Shared/actions/getMappedUserIds';
import { createNotification } from '@/modules/Notification/actions/createNotification';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/modules/Shared/constants';

export const createTaggedComment = async (taskId: string, text: string) => {
	const userIdsArray = await getMappedUserIds();

	const [firstWord, ...rest] = (text as string).split(' ');

	if (!firstWord.startsWith('@')) return;

	const tag = firstWord.slice(1);

	const taggedUserId = userIdsArray.find(el => el.username === tag)?.userId;

	if (!taggedUserId) return;

	const notificationText = `You've been mentioned in a comment "${rest.join(' ')}" to task`;

	await createNotification(notificationText, taskId, taggedUserId);

	revalidatePath(DASHBOARD);
};
