'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';
import { TaskItem } from '@/types';

export const getTaskById = async (taskId: string) => {
	const userId = auth().userId as string;

	return prisma.task.findFirst({
		where: {
			id: +taskId,
			userSpecificData: {
				userId: userId,
			},
		},
	}) as Promise<TaskItem>;
};
