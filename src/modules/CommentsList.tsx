'use client';
import { AddCommentTextField, CommentsContainer, DarkGreyText, Module } from '@/modules/StyledComponents';
import { TaskItem } from '@/types';
import { useUser } from '@clerk/nextjs';
import { sortComments } from '@/utils/sortComments';
import { Box } from '@mui/material';
import { SingleComment } from '@/modules/SingleComment';
import { useHandleComments } from '@/hooks/useHandleComments';

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
