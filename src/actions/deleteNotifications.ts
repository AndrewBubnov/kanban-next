'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';

export const deleteNotifications = async () => {
	const userId = auth().userId as string;

	await prisma.notification.deleteMany({ where: { userId } });

	await prisma.user.update({
		where: { userId },
		data: { notifications: { create: [] } },
	});
};
