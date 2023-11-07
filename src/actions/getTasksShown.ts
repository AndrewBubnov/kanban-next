'use server';
import { prisma } from '@/db';
import { TaskItem } from '@/types';
import { sortByIndices } from '@/utils/sortByIndices';
import { getUserIdShown } from '@/actions/getUserIdShown';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/constants';

export const getTasksShown = async (): Promise<TaskItem[]> => {
	const userId = await getUserIdShown();
	const parameter = userId ? { userId } : {};
	const tasks = await prisma.task.findMany({
		where: parameter,
		include: { assignee: true, comments: true },
	});

	revalidatePath(DASHBOARD);

	return tasks
		.map(task => ({
			...task,
			assignee: task.assignee,
		}))
		.sort(sortByIndices);
};
