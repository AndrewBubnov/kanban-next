'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { createNotification } from '@/modules/Toast/actions/createNotification';
import { DASHBOARD } from '@/modules/Shared/constants';
import { EditedTaskContent } from '@/modules/CreateAndUpdateTask/types';

export const updateSingleTask = async (userId: string, taskId: string, updatedTaskData: EditedTaskContent) => {
	const existingTask = await prisma.task.findFirst({
		where: {
			id: taskId,
		},
		include: {
			assignee: true,
			comments: true,
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
				comments: {
					connect: existingTask.comments.map(comment => ({
						id: comment.id,
					})),
				},
			},
		});
	}

	const notification = "You've been assigned a task";

	await createNotification(notification, taskId, userId);

	revalidatePath(DASHBOARD);
};
