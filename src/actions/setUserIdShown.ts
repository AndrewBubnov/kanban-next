'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/constants';

export const setUserIdShown = async (userId: string) => {
	await prisma.userIdShown.upsert({
		where: { id: 1 },
		update: { userId },
		create: { id: 1, userId },
	});
	revalidatePath(DASHBOARD);
};
