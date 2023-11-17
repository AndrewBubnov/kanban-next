'use server';
import { prisma } from '@/db';
import { createNotification } from '@/modules/Toast/actions/createNotification';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/modules/Shared/constants';
import { AddTaskAction } from '@/modules/CreateAndUpdateTask/types';

export const createTask = async ({ userId, title, description, estimateDays }: AddTaskAction) => {
	const user = await prisma.user.findUnique({
		where: { userId },
		include: {
			tasks: true,
			notifications: true,
		},
	});

	if (!user) return;

	const { id, isAdmin, username, email, imageUrl } = user;

	const newTask = await prisma.task.create({
		data: {
			userId,
			title,
			description,
			estimateDays: parseFloat(estimateDays) || 0,
			status: 'New',
			index: -1,
			comments: { create: [] },
		},
	});

	const taskItem = {
		...newTask,
		assignee: {
			id,
			userId,
			email,
			username,
			imageUrl,
			isAdmin,
		},
	};
	user.tasks.push(taskItem);

	await prisma.user.update({
		where: { userId },
		data: { tasks: { connect: { id: newTask.id } } },
	});

	const notification = `You've been assigned a task`;

	await createNotification(notification, newTask.id, userId);

	revalidatePath(DASHBOARD);
};
