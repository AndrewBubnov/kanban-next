'use server';
import { prisma } from '@/db';
import { Status, TaskItem } from '@/types';
import { sortByIndices } from '@/utils/sortByIndices';

export const getTasks = async (): Promise<TaskItem[]> => {
	const tasks = await prisma.task.findMany({
		include: { assignee: true, comments: true },
	});

	return tasks
		.map(task => ({
			...task,
			status: task.status as Status,
			assignee: task.assignee,
		}))
		.sort(sortByIndices);
};
