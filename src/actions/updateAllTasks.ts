'use server';
import { auth } from '@clerk/nextjs';
import { getUser } from '@/actions/getUser';
import { prisma } from '@/db';
import { TaskItem } from '@/types';
import { revalidatePath } from 'next/cache';

export const updateAllTasks = async (updatedTaskData: TaskItem[]) => {
	const userId = auth().userId as string;

	const user = await getUser(userId);

	if (user) {
		for (const task of updatedTaskData) {
			await prisma.task.update({
				where: { id: task.id },
				data: {
					title: task.title,
					description: task.description,
					status: task.status,
				},
			});
		}
	}
	revalidatePath('/dashboard');
};
