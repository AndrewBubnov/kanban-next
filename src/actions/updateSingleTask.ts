'use server';
import { prisma } from '@/db';
import { EditedTaskContent } from '@/types';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/constants';
import { addNotification } from '@/components/Toast/actions/addNotification';

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

	await addNotification(notification, taskId, userId);

	revalidatePath(DASHBOARD);
};
