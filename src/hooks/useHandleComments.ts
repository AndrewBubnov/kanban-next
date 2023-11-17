import { ChangeEvent, useEffect, useState } from 'react';
import { deleteComment } from '@/actions/deleteComment';
import { updateComment } from '@/actions/updateComment';
import { createComment } from '@/actions/createComment';
import { EditHandlerArgs, TaskItem } from '@/types';

export const useHandleComments = (task: TaskItem) => {
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
			await createComment({ taskId: task.id, text });
		}
		setText('');
	};

	return { editHandler, deleteHandler, changeHandler, submitHandler, commentId, text };
};
