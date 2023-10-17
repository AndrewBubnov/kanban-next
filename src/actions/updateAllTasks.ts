'use server';
import { auth } from '@clerk/nextjs';
import { getUser } from '@/actions/getUser';
import { prisma } from '@/db';
import { EditedTaskContent, TaskItem } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateAllTasks = async (updatedTaskData: EditedTaskContent[]) => {
	const userId = auth().userId as string;

	const user = await getUser(userId);

	if (user) {
		for (let i = 0; i < user.tasks.length; i++) {
			const taskId = user.tasks[i].id;
			const updatedData: EditedTaskContent | undefined = updatedTaskData.find((_, index) => index === i);

			await prisma.task.update({
				where: { id: taskId },
				data: {
					title: updatedData?.title || '',
					description: updatedData?.description || '',
					status: updatedData?.status || null,
				},
			});
		}
	}
	revalidatePath('/dashboard');
};
