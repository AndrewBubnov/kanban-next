'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/actions/getUser';
import { AddTaskAction, Status } from '@/types';
import { DASHBOARD } from '@/constants';

export const addTask = async ({ userId, title, description }: AddTaskAction) => {
	const user = await getUser();

	if (!user) return;

	const { id, isAdmin, username, email } = user;

	const newTask = await prisma.task.create({
		data: {
			userId,
			title,
			description,
			status: Status.NEW,
			index: 0,
			comments: { create: [] },
		},
	});

	const taskItem = {
		...newTask,
		status: newTask.status as Status,
		assignee: {
			id,
			userId: user.userId,
			email,
			username,
			isAdmin,
		},
	};
	user.tasks.push(taskItem);

	await prisma.user.update({
		where: { userId },
		data: { tasks: { connect: { id: newTask.id } } },
	});

	revalidatePath(DASHBOARD);
};
