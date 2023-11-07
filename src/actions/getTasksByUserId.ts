'use server';
import { prisma } from '@/db';
import { TaskItem } from '@/types';
import { sortByIndices } from '@/utils/sortByIndices';

export const getTasksByUserId = async (userId: string): Promise<TaskItem[]> => {
	const parameter = userId ? { userId } : {};
	const tasks = await prisma.task.findMany({
		where: parameter,
		include: { assignee: true, comments: true },
	});

	return tasks
		.map(task => ({
			...task,
			assignee: task.assignee,
		}))
		.sort(sortByIndices);
};
