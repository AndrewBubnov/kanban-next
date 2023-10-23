import { prisma } from '@/db';

export const getMappedUserIds = async () => {
	const users = await prisma.user.findMany({
		select: {
			userId: true,
			username: true,
		},
	});

	return users.map(user => ({
		userId: user.userId,
		username: user.username,
	}));
};
