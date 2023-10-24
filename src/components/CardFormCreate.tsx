import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { ButtonContainer, StyledButton } from '@/components/StyledComponents';
import { ChangeEvent, useState } from 'react';
import { CardFormCreateProps } from '@/types';
import { addTask } from '@/actions/addTask';
import { CardAssigneeSelect } from '@/components/CardAssigneeSelect';
import { useUser } from '@clerk/nextjs';

export const CardFormCreate = ({ userIdsArray, isAdmin, onCancel }: CardFormCreateProps) => {
	const { user } = useUser();
	const userId = user?.id || '';
	const [assigneeId, setAssigneeId] = useState<string>('');
	const [username, setUsername] = useState<string>(userIdsArray.find(el => el.userId === userId)?.username || '');

	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const titleHandler = (evt: ChangeEvent<HTMLInputElement>) => setTitle(evt.target.value);
	const descriptionHandler = (evt: ChangeEvent<HTMLInputElement>) => setDescription(evt.target.value);
	const confirmHandler = async (data: FormData) => {
		const title = data.get('title') as string;
		const description = data.get('description') as string;
		if (!title) return;
		await addTask({ title, description, userId: assigneeId });
		onCancel();
	};

	return (
		<form action={confirmHandler}>
			{isAdmin && (
				<CardAssigneeSelect
					username={username}
					setUsername={setUsername}
					setAssigneeId={setAssigneeId}
					userIdsArray={userIdsArray}
				/>
			)}
			<Box mt={2}>Title</Box>
			<TextField onChange={titleHandler} value={title} name="title" margin="dense" fullWidth />
			<Box mt={2}>Description</Box>
			<TextField
				onChange={descriptionHandler}
				value={description}
				margin="dense"
				variant="outlined"
				name="description"
				fullWidth
				multiline
				rows={4}
			/>
			<Grid container flexDirection="row-reverse">
				<ButtonContainer item>
					<StyledButton size="small" variant="outlined" onClick={onCancel}>
						Cancel
					</StyledButton>
					<StyledButton type="submit" size="small" variant="outlined">
						Confirm
					</StyledButton>
				</ButtonContainer>
			</Grid>
		</form>
	);
};
