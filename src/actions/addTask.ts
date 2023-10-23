'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { getUser } from '@/actions/getUser';
import { AddTaskAction, Status } from '@/types';

export const addTask = async ({ userId, title, description }: AddTaskAction) => {
	const user = await getUser();

	if (!user) return;

	const newTask = await prisma.task.create({
		data: {
			userId,
			title,
			description,
			status: Status.NEW,
			index: 0,
		},
	});
	user.tasks.push(newTask);

	await prisma.user.update({
		where: { userId },
		data: { tasks: { connect: { id: newTask.id } } },
	});
	revalidatePath('/dashboard');
};
