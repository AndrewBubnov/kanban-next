import { prisma } from '@/db';
import { ALL_USERNAMES } from '@/constants';

export const getMappedUserIds = async () => {
	const users = await prisma.user.findMany({
		select: {
			userId: true,
			username: true,
		},
	});

	return [
		{ userId: '', username: ALL_USERNAMES },
		...users.map(user => ({
			userId: user.userId,
			username: user.username,
		})),
	];
};
