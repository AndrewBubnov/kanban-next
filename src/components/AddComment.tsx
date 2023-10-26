'use client';
import { ChangeEvent, useState } from 'react';
import { AddCommentTextField, StyledButton } from '@/components/StyledComponents';
import { addCommentToTask } from '@/actions/addCommentToTask';
import { AddCommentProps } from '@/types';

export const AddComment = ({ taskId, username, email }: AddCommentProps) => {
	const [text, setText] = useState<string>('');
	const changeHandler = (evt: ChangeEvent<HTMLInputElement>) => setText(evt.target.value);

	const submitHandler = async () => {
		if (!text) return;
		await addCommentToTask({ taskId, username, email, text });
		setText('');
	};
	return (
		<form action={submitHandler}>
			<AddCommentTextField
				fullWidth
				autoComplete="off"
				label="Add comment"
				value={text}
				onChange={changeHandler}
			/>
			<StyledButton type="submit">Submit</StyledButton>
		</form>
	);
};
