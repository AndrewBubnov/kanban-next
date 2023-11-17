'use server';
import { prisma } from '@/db';

export const createNotification = async (text: string, link: string, userId: string) => {
	const user = await prisma.user.findUnique({
		where: { userId },
		include: { notifications: true },
	});

	if (!user) return;

	const notification = await prisma.notification.create({
		data: {
			text,
			link,
			userId,
		},
	});

	await prisma.user.update({
		where: { userId },
		data: { notifications: { connect: { id: notification.id } } },
	});
};
