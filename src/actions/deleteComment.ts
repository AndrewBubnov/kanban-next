'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/constants';

export const deleteComment = async (taskId: string, commentId: string) => {
	await prisma.comment.delete({
		where: { id: commentId },
	});
	revalidatePath(`${DASHBOARD}/${taskId}`);
};
