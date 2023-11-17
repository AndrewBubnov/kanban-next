'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/app/dashboard/[taskId]/edit/actions/getUser';

import { DASHBOARD } from '@/modules/Shared/constants';

export const deleteTask = async (taskId: string) => {
	const user = await getUser();

	if (!user) return;

	await prisma.comment.deleteMany({
		where: {
			taskId: taskId,
		},
	});

	await prisma.task.delete({
		where: {
			id: taskId,
		},
	});
	revalidatePath(DASHBOARD);
};
