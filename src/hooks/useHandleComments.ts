import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { deleteComment } from '@/actions/deleteComment';
import { updateComment } from '@/actions/updateComment';
import { addComment } from '@/actions/addComment';
import { EditHandlerArgs, UseHandleCommentsProps } from '@/types';
import { addNotification } from '@/actions/addNotification';
import { DetailsContext } from '@/components/DetailsProvider';

export const useHandleComments = ({ task, username, userId }: UseHandleCommentsProps) => {
	const { userIdsArray } = useContext(DetailsContext);
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
	const deleteHandler = (commentId: string) => async () => {
		setText('');
		await deleteComment(task.id, commentId);
	};
	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => setText(evt.target.value);

	const submitHandler = async () => {
		if (!text) return;

		if (commentId) {
			await updateComment(task.id, commentId, { text });
		} else {
			await addComment({ taskId: task.id, username, userId, text });
		}
		setText('');
		const [firstWord, ...rest] = text.split(' ');
		if (firstWord.startsWith('@')) {
			const tag = firstWord.slice(1);
			const taggedUserId = userIdsArray.find(el => el.username === tag)?.userId;
			const notificationText = `You've been mentioned in a comment to task ${task.id.slice(0, 4)}: ${rest.join(
				' '
			)}`;
			await addNotification(notificationText, taggedUserId);
		}
	};

	return { editHandler, deleteHandler, changeHandler, submitHandler, commentId, text };
};
