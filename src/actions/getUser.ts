'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';
import { TaskItem } from '@/types';

export const getUser = async () => {
	const userId = auth().userId as string;

	return prisma.user.findUnique({
		where: {
			userId,
		},
		include: {
			tasks: true,
		},
	}) as unknown as Promise<{
		id: number;
		userId: string;
		email: string;
		username: string;
		isAdmin: boolean;
		tasks: TaskItem[];
	}>;
};
