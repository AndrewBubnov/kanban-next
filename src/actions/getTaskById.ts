'use server';
import { prisma } from '@/db';
import { TaskItem } from '@/types';

export const getTaskById = async (taskId: string): Promise<TaskItem> => {
	return prisma.task.findUnique({
		where: { id: taskId },
	}) as unknown as TaskItem;
};
