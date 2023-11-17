'use server';
import { prisma } from '@/db';

import { TaskItem } from '@/modules/Shared/types';

export const getTaskById = async (taskId: string): Promise<TaskItem> => {
	return prisma.task.findUnique({
		where: { id: taskId },
		include: {
			assignee: true,
			comments: true,
		},
	}) as unknown as TaskItem;
};
