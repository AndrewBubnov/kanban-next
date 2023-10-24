'use server';
import { prisma } from '@/db';
import { EditedTaskContent } from '@/types';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/constants';

export const updateSingleTask = async (userId: string, taskId: string, updatedTaskData: EditedTaskContent) => {
	const existingTask = await prisma.task.findFirst({
		where: {
			id: taskId,
		},
		include: {
			assignee: true,
		},
	});

	if (existingTask) {
		await prisma.task.update({
			where: { id: taskId },
			data: {
				...updatedTaskData,
				assignee: {
					connect: {
						userId,
					},
				},
			},
		});
	}
	revalidatePath(DASHBOARD);
};
