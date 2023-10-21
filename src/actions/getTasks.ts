'use server';
import { prisma } from '@/db';
import { Status, TaskItem } from '@/types';
import { currentUser } from '@clerk/nextjs';

export const getTasks = async (userId: string): Promise<TaskItem[]> => {
	const user = await currentUser();
	const username = user?.username || '';
	const email = user?.emailAddresses[0].emailAddress || '';
	const existingUser = await prisma.user.findUnique({ where: { userId } });
	if (!existingUser) await prisma.user.create({ data: { userId, email, username } });

	const tasks = await prisma.task.findMany({
		where: { userId },
		include: {
			assignee: true,
		},
	});

	return tasks.map(task => ({
		...task,
		status: task.status as Status,
		email: task.assignee.email,
		username: task.assignee.username,
	}));
};
