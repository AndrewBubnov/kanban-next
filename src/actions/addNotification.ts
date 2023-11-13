'use server';
import { prisma } from '@/db';

export const addNotification = async (text: string, userId?: string) => {
	if (!userId) return;

	const user = await prisma.user.findUnique({
		where: { userId },
		include: { notifications: true },
	});

	if (!user) return;

	const notification = await prisma.notification.create({
		data: {
			text,
			userId,
		},
	});

	await prisma.user.update({
		where: { userId },
		data: { notifications: { connect: { id: notification.id } } },
	});
};
