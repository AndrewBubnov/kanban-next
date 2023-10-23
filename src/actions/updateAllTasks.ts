'use server';
import { auth } from '@clerk/nextjs';
import { getUser } from '@/actions/getUser';
import { prisma } from '@/db';
import { TaskItem } from '@/types';
import { revalidatePath } from 'next/cache';

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
	revalidatePath('/dashboard');
};
