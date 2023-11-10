'use server';
import { prisma } from '@/db';
import { TaskItem, UserIdsArrayItem } from '@/types';
import { sortByIndices } from '@/utils/sortByIndices';
import { revalidatePath } from 'next/cache';
import { ALL_USERS, DASHBOARD } from '@/constants';

export const getTasksShown = async (username: string, userIdsArray: UserIdsArrayItem[] = []): Promise<TaskItem[]> => {
	const userId = userIdsArray.find(item => username === item.username)?.userId || '';
	const parameter = username === ALL_USERS || !userId ? {} : { userId };

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
