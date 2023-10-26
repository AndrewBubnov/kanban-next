'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/constants';
import { AddCommentToTask } from '@/types';

export async function addComment({ taskId, username, userId, text }: AddCommentToTask) {
	const task = await prisma.task.findUnique({
		where: { id: taskId },
		include: {
			comments: true,
		},
	});

	if (!task) return;

	const comment = await prisma.comment.create({
		data: {
			taskId,
			username,
			userId,
			text,
		},
	});
	task.comments.push(comment);

	await prisma.task.update({
		where: { id: taskId },
		data: { comments: { connect: { id: comment.id } } },
	});

	revalidatePath(`${DASHBOARD}/${taskId}`);
}
