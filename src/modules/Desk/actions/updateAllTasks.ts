'use server';
import { getUser } from '@/app/dashboard/[taskId]/edit/actions/getUser';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';

import { DASHBOARD } from '@/modules/Shared/constants';
import { TaskItem } from '@/modules/Shared/types';

export const updateAllTasks = async (updatedTaskData: TaskItem[]) => {
	const user = await getUser();

	if (user) {
		for (const task of updatedTaskData) {
			const { id, status, index, description, title } = task;
			await prisma.task.update({
				where: { id },
				data: { title, description, status, index },
			});
		}
	}
	revalidatePath(DASHBOARD);
};
