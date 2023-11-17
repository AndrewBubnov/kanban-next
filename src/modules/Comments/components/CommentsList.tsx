'use client';
import { DarkGreyText, Module } from '@/modules/Shared/styled';
import { useUser } from '@clerk/nextjs';
import { sortComments } from '@/modules/Comments/utils/sortComments';
import { Box } from '@mui/material';
import { SingleComment } from '@/modules/Comments/components/SingleComment';
import { useHandleComments } from '@/modules/Comments/hooks/useHandleComments';
import { AddCommentTextField, CommentsContainer } from '@/modules/Comments/styled';
import { TaskItem } from '@/modules/Shared/types';

export const CommentsList = ({ task }: { task: TaskItem }) => {
	const { editHandler, deleteHandler, changeHandler, submitHandler, commentId, text } = useHandleComments(task);

	return (
		<>
			{task.comments.length ? (
				<Module>
					<Box>
						<DarkGreyText>Comments</DarkGreyText>
						<CommentsContainer>
							{task.comments.sort(sortComments).map(comment => (
								<SingleComment
									comment={comment}
									deleteHandler={deleteHandler(comment.id)}
									editHandler={editHandler({ text: comment.text, id: comment.id })}
									key={comment.id}
								/>
							))}
						</CommentsContainer>
					</Box>
				</Module>
			) : null}
			<Module>
				<form action={submitHandler}>
					<AddCommentTextField
						fullWidth
						autoComplete="off"
						label={commentId ? 'Edit comment' : 'Add comment'}
						value={text}
						onChange={changeHandler}
					/>
				</form>
			</Module>
		</>
	);
};
