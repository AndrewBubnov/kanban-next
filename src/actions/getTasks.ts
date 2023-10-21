'use server';
import { prisma } from '@/db';
import { Status, TaskItem } from '@/types';
import { currentUser } from '@clerk/nextjs';
import { ADMINS_LIST } from '@/constants';
import { getAdminList } from '@/actions/getAdminList';

export const getTasks = async (userId: string): Promise<TaskItem[]> => {
	const user = await currentUser();
	const adminList = await getAdminList(userId);
	const username = user?.username || '';
	const email = user?.emailAddresses[0].emailAddress || '';

	const existingUser = await prisma.user.findUnique({ where: { userId } });
	if (!existingUser) {
		await prisma.user.create({ data: { userId, email, username, isAdmin: adminList.includes(email) } });
	}
	const tasks = await prisma.task.findMany({
		where: { userId },
		include: { assignee: true },
	});

	return tasks.map(task => ({
		...task,
		status: task.status as Status,
		email: task.assignee.email,
		username: task.assignee.username,
	}));
};
