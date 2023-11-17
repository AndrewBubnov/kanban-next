'use server';
import { prisma } from '@/db';
import { Prisma } from '.prisma/client';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/modules/Shared/constants';
import { createTaggedComment } from '@/modules/Comments/actions/createComment';

export const updateComment = async (
	taskId: string,
	commentId: string,
	updatedCommentData: Partial<Prisma.CommentUpdateInput>
) => {
	await prisma.comment.update({
		where: { id: commentId },
		data: updatedCommentData,
	});

	await createTaggedComment(taskId, updatedCommentData.text as string);

	revalidatePath(`${DASHBOARD}/${taskId}`);
};
