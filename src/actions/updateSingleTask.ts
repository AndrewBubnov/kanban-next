'use server';
import { prisma } from '@/db';
import { auth } from '@clerk/nextjs';
import { EditedTaskContent } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateSingleTask = async (taskId: string, updatedTaskData: EditedTaskContent) => {
	const userId = auth().userId as string;

	const existingTask = await prisma.task.findFirst({
		where: {
			id: taskId,
			assignee: {
				userId: userId,
			},
		},
	});

	if (existingTask) {
		await prisma.task.update({
			where: { id: taskId },
			data: updatedTaskData,
		});
	}
	revalidatePath('/dashboard');
};
