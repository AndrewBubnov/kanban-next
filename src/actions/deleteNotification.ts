'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';

export const deleteNotification = async (deletedIndex: number) => {
	const userId = auth().userId as string;

	const notifications = await prisma.notification.findMany({ where: { userId } });

	const updated = [...notifications.slice(0, deletedIndex), ...notifications.slice(deletedIndex + 1)].map(
		({ text, link }) => ({
			text,
			link,
		})
	);

	await prisma.notification.deleteMany({ where: { userId } });

	for (const { text, link } of updated) {
		await prisma.notification.create({
			data: { text, link },
		});
	}

	await prisma.user.update({
		where: { userId },
		data: { notifications: { create: updated } },
	});
};
