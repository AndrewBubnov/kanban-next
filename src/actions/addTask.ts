'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/actions/getUser';
import { AddTaskAction, Status, TaskItem } from '@/types';
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
		},
	});
	const taskItem: TaskItem = {
		title: newTask.title,
		description: newTask.description,
		id: newTask.id,
		status: newTask.status as Status,
		index: newTask.index,
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
