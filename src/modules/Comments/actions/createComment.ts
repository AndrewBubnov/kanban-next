'use server';
import { currentUser } from '@clerk/nextjs';
import { prisma } from '@/db';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/modules/Shared/constants';
import { createTaggedComment } from '@/modules/CreateAndUpdateTask/actions/createTaggedComment';
import { AddCommentToTask } from '@/modules/Comments/types';

export async function createComment({ taskId, text }: AddCommentToTask) {
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
