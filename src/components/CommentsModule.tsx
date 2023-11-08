'use client';
import { ChangeEvent, useEffect, useState } from 'react';
import {
	AddCommentTextField,
	CommentsContainer,
	CommentText,
	CommentWrapper,
	DarkGreyText,
	DarkGreyUsername,
	DateContainer,
	FlexWrapper,
	GrayIcon,
	HoverSensitiveWrapper,
	Module,
	SmallEditIcon,
	SmallIconButton,
} from '@/components/StyledComponents';
import { EditHandlerArgs, TaskItem } from '@/types';
import { useUser } from '@clerk/nextjs';
import { sortComments } from '@/utils/sortComments';
import { Box } from '@mui/material';
import { getElapsedTime } from '@/utils/getElapsedTime';
import { addComment } from '@/actions/addComment';
import { updateComment } from '@/actions/updateComment';

export const CommentsModule = ({ task }: { task: TaskItem }) => {
	const { id, comments } = task;
	const { user } = useUser();
	const username = user?.username!;
	const userId = user?.id!;
	const [text, setText] = useState<string>('');
	const [commentId, setCommentId] = useState<string>('');

	useEffect(() => {
		if (!text) setCommentId('');
	}, [text]);

	const editHandler =
		({ id, text }: EditHandlerArgs) =>
		() => {
			setCommentId(id);
			setText(text);
		};
	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => setText(evt.target.value);

	const submitHandler = async () => {
		if (!text) return;
		if (commentId) {
			await updateComment(task.id, commentId, { text });
		} else {
			await addComment({ taskId: id, username, userId, text });
		}
		setText('');
	};

	return (
		<>
			{comments.length ? (
				<Module>
					<Box>
						<DarkGreyText>Comments</DarkGreyText>
						<CommentsContainer>
							{task.comments.sort(sortComments).map(({ id, username, text, userId, createdAt }) => (
								<CommentWrapper key={id}>
									<FlexWrapper>
										<FlexWrapper>
											<GrayIcon />
											<DarkGreyUsername component="span">{username}</DarkGreyUsername>
										</FlexWrapper>
										<FlexWrapper>
											<DateContainer component="span">{getElapsedTime(createdAt)}</DateContainer>
										</FlexWrapper>
									</FlexWrapper>
									<HoverSensitiveWrapper>
										{userId === userId ? (
											<SmallIconButton onClick={editHandler({ text, id })}>
												<SmallEditIcon />
											</SmallIconButton>
										) : null}
										<CommentText>{text}</CommentText>
									</HoverSensitiveWrapper>
								</CommentWrapper>
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
