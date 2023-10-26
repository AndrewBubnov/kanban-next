'use server';
import { prisma } from '@/db';
import { Prisma } from '.prisma/client';
import { revalidatePath } from 'next/cache';
import { DASHBOARD } from '@/constants';

export const updateComment = async (
	taskId: string,
	commentId: number,
	updatedCommentData: Partial<Prisma.CommentUpdateInput>
) => {
	await prisma.comment.update({
		where: {
			id: commentId,
		},
		data: updatedCommentData,
	});
	revalidatePath(`${DASHBOARD}/${taskId}`);
};
