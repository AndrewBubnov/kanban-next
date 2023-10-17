'use server';
import { prisma } from '@/db';

export const getUser = async (userId: string) => {
	return prisma.user.findUnique({
		where: {
			userId,
		},
		include: {
			tasks: true,
		},
	});
};
