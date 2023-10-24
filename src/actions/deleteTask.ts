'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/actions/getUser';
import { AddTaskAction, Status, TaskItem } from '@/types';
import { DASHBOARD } from '@/constants';

export const deleteTask = async (taskId: string) => {
	const user = await getUser();

	if (!user) return;

	await prisma.task.delete({
		where: {
			id: taskId,
		},
	});
	revalidatePath(DASHBOARD);
};
