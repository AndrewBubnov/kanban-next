import { prisma } from '@/db';

export const getUserIdShown = async () => {
	let userIdShown = await prisma.userIdShown.findFirst({ where: { id: 1 } });

	return userIdShown?.userId || '';
};
