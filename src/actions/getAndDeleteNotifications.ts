'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';

export const getAndDeleteNotifications = async () => {
	const userId = auth().userId as string;

	const notifications = await prisma.notification.findMany({ where: { userId } });

	await prisma.notification.deleteMany({ where: { userId } });

	await prisma.user.update({
		where: { userId },
		data: { notifications: { create: [] } },
	});

	return (notifications || []).map(el => el.text);
};
