'use server';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/constants';
import { AddCommentToTask } from '@/types';
import { createTaggedComment } from '@/actions/createTaggedComment';
import { currentUser } from '@clerk/nextjs';

export async function addComment({ taskId, text }: AddCommentToTask) {
	const user = await currentUser();
	const userId = user?.id!;
	const username = user?.username!;

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

	await createTaggedComment(taskId, text);

	revalidatePath(`${DASHBOARD}/${taskId}`);
}
