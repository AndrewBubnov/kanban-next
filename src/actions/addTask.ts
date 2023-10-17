'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { getUser } from '@/actions/getUser';

export const addTask = async (task: { title: string; description: string }) => {
	const userId = auth().userId as string;

	const user = await getUser(userId);

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
	revalidatePath('/dashboard');
};
