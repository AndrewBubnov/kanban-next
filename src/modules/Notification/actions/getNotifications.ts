'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';

export const getNotifications = async () => {
	const userId = auth().userId as string;

	const notifications = await prisma.notification.findMany({ where: { userId } });

	return (notifications || []).map(el => ({ text: el.text, link: el.link, id: el.id }));
};
