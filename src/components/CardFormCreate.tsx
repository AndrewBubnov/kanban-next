import { Box, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { StyledModalButton } from '@/components/StyledComponents';
import { ChangeEvent, useState } from 'react';
import { CardFormCreateProps } from '@/types';
import { addTask } from '@/actions/addTask';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useUser } from '@clerk/nextjs';

export const CardFormCreate = ({ userIdsArray, isAdmin, onCancel }: CardFormCreateProps) => {
	const { user } = useUser();
	const userId = user?.id || '';
	const [assigneeId, setAssigneeId] = useState<string>(userId);
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
	const changeHandler = (event: SelectChangeEvent<unknown>) => {
		const value = event.target.value as string;
		const currentUserId = userIdsArray.find(item => value === item.username)?.userId || '';
		setUsername(value);
		setAssigneeId(currentUserId);
	};

	return (
		<form action={confirmHandler}>
			{isAdmin && (
				<FormControl fullWidth>
					<InputLabel id="assignee">Assignee</InputLabel>
					<Select value={username} label="Assignee" onChange={changeHandler}>
						{userIdsArray.map(el => (
							<MenuItem key={el.userId} value={el.username}>
								{el.username}
							</MenuItem>
						))}
					</Select>
				</FormControl>
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
				<Grid item>
					<StyledModalButton variant="text" onClick={onCancel}>
						Cancel
					</StyledModalButton>
					<StyledModalButton type="submit" variant="text">
						Confirm
					</StyledModalButton>
				</Grid>
			</Grid>
		</form>
	);
};
