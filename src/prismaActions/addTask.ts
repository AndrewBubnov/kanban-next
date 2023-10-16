'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';

export const addTask = async (task: { title: string; description: string }, userId: string) => {
	const user = await prisma.user.findUnique({
		where: {
			userId,
		},
		include: {
			tasks: true,
		},
	});

	if (!user) return;

	const newTask = await prisma.task.create({
		data: {
			userId,
			title: task.title,
			description: task.description,
		},
	});
	user.tasks.push(newTask);

	await prisma.user.update({
		where: {
			userId,
		},
		data: {
			tasks: {
				connect: { id: newTask.id },
			},
		},
	});
	revalidatePath('/');
};
