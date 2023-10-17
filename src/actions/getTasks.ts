'use server';
import { prisma } from '@/db';
import { TaskItem } from '@/types';

export const getTasks = async (userId: string): Promise<TaskItem[]> => {
	const existingUser = await prisma.user.findUnique({ where: { userId } });
	if (!existingUser) await prisma.user.create({ data: { userId } });

	return prisma.task.findMany({ where: { userId } }) as unknown as TaskItem[];
};
