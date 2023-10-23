'use server';
import { prisma } from '@/db';
import { Status, TaskItem } from '@/types';
import { auth, currentUser } from '@clerk/nextjs';
import { getAdminList } from '@/actions/getAdminList';
import { sortByIndices } from '@/utils/sortByIndices';

export const getTasks = async (): Promise<TaskItem[]> => {
	const userId = auth().userId as string;
	const user = await currentUser();
	const adminList = await getAdminList(userId);
	const username = user?.username || '';
	const email = user?.emailAddresses[0].emailAddress || '';

	const existingUser = await prisma.user.findUnique({ where: { userId } });
	if (!existingUser) {
		await prisma.user.create({ data: { userId, email, username, isAdmin: adminList.includes(email) } });
	}

	const tasks = await prisma.task.findMany({
		include: { assignee: true },
	});

	return tasks
		.map(task => ({
			...task,
			status: task.status as Status,
			assignee: task.assignee,
		}))
		.sort(sortByIndices);
};
