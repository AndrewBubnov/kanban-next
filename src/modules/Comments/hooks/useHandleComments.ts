import { ChangeEvent, useEffect, useState } from 'react';
import { deleteComment } from '@/modules/Comments/actions/deleteComment';
import { updateComment } from '@/modules/Comments/actions/updateComment';
import { createComment } from '@/modules/Comments/actions/createComment';
import { TaskItem } from '@/modules/Shared/types';
import { EditHandlerArgs } from '@/modules/Comments/types';
import { emitErrorNotification } from '@/modules/Notification/components/ErrorNotificationEmitter';
import { getErrorMessage } from '@/modules/Comments/utils';

export const useHandleComments = (task: TaskItem) => {
	const [text, setText] = useState<string>('');
	const [submittedText, setSubmittedText] = useState<string>('');
	const [commentId, setCommentId] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		if (!submittedText) return;
		setText('');
		setSubmittedText('');
		setCommentId('');
		setIsLoading(true);
		(async function () {
			try {
				if (commentId) {
					await updateComment(task.id, commentId, { text: submittedText });
				} else {
					await createComment({ taskId: task.id, text: submittedText });
				}
			} catch {
				emitErrorNotification(getErrorMessage(commentId));
			} finally {
				setIsLoading(false);
			}
		})();
	}, [commentId, submittedText, task.id]);

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
		if (isLoading || !text) return;
		setSubmittedText(text);
	};

	return { editHandler, deleteHandler, changeHandler, submitHandler, commentId, text, isLoading };
};
